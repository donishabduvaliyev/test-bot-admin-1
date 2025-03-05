import { useState, useEffect } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "./firebaseConfig";

const App = () => {
  const [sections, setSections] = useState([]);
  const [newSection, setNewSection] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [newFood, setNewFood] = useState({
    name: "",
    price: "",
    image: null,
    sizeRequired: false,
    sizes: "",
    toppingsRequired: false,
    toppings: "",
  });
  const [loading, setLoading] = useState(false);

  const storage = getStorage(app);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const response = await fetch("https://your-backend.com/sections");
      const data = await response.json();
      setSections(data);
    } catch (error) {
      console.error("Error fetching sections:", error);
    }
  };

  const addSection = async () => {
    if (!newSection.trim()) return;
    try {
      const response = await fetch("https://your-backend.com/sections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newSection }),
      });
      if (response.ok) {
        fetchSections();
        setNewSection("");
      }
    } catch (error) {
      console.error("Error adding section:", error);
    }
  };

  const addFoodItem = async () => {
    if (!newFood.name || !newFood.price || !newFood.image || !selectedSection) {
      return alert("Please fill all required fields!");
    }

    try {
      setLoading(true);
      const imageRef = ref(storage, `foodImages/${newFood.image.name}`);
      await uploadBytes(imageRef, newFood.image);
      const imageUrl = await getDownloadURL(imageRef);

      const foodData = {
        ...newFood,
        image: imageUrl,
        sizes: newFood.sizeRequired ? newFood.sizes.split(",") : [],
        toppings: newFood.toppingsRequired ? newFood.toppings.split(",") : [],
        section: selectedSection,
      };

      const response = await fetch("https://your-backend.com/foods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(foodData),
      });

      if (response.ok) {
        alert("Food item added successfully!");
        setNewFood({ name: "", price: "", image: null, sizeRequired: false, sizes: "", toppingsRequired: false, toppings: "" });
      }
    } catch (error) {
      console.error("Error adding food item:", error);
      alert("Failed to add food item!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-500 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-xl font-bold text-white mb-4">Admin Panel</h1>
      <div className="bg-gray-400 max-w-md w-full p-4 text-center rounded-lg shadow-lg">
        {/* Section Selection */}
        <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)} className="border p-2 rounded w-full">
          <option value="">Select Section</option>
          {sections.map((sec) => (
            <option key={sec._id} value={sec._id}>{sec.name}</option>
          ))}
        </select>
        <input type="text" value={newSection} onChange={(e) => setNewSection(e.target.value)} placeholder="New Section" className="border p-2 rounded w-full mt-2" />
        <button onClick={addSection} className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full">Add Section</button>

        {/* Food Input */}
        <div className="my-4 flex flex-col gap-2">
          <input type="text" value={newFood.name} onChange={(e) => setNewFood({ ...newFood, name: e.target.value })} placeholder="Food Name" className="border p-2 rounded" />
          <input type="number" value={newFood.price} onChange={(e) => setNewFood({ ...newFood, price: e.target.value })} placeholder="Price" className="border p-2 rounded" />
          <input type="file" onChange={(e) => setNewFood({ ...newFood, image: e.target.files[0] })} className="border p-2 rounded" />
          <label>
            <input type="checkbox" checked={newFood.sizeRequired} onChange={() => setNewFood({ ...newFood, sizeRequired: !newFood.sizeRequired })} /> Size Required?
          </label>
          {newFood.sizeRequired && <input type="text" value={newFood.sizes} onChange={(e) => setNewFood({ ...newFood, sizes: e.target.value })} placeholder="Sizes (comma separated)" className="border p-2 rounded" />}
          <label>
            <input type="checkbox" checked={newFood.toppingsRequired} onChange={() => setNewFood({ ...newFood, toppingsRequired: !newFood.toppingsRequired })} /> Toppings Required?
          </label>
          {newFood.toppingsRequired && <input type="text" value={newFood.toppings} onChange={(e) => setNewFood({ ...newFood, toppings: e.target.value })} placeholder="Toppings (comma separated)" className="border p-2 rounded" />}
          <button onClick={addFoodItem} className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50" disabled={loading}>{loading ? "Uploading..." : "Add Food"}</button>
        </div>
      </div>
    </div>
  );
};

export default App;
