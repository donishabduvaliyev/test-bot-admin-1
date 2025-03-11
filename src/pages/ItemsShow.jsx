import React, { useState } from "react";
import { useCart } from "../contex";
import SearchBar from "../components/searchbar";
import EditItem from "../components/EditItem";

function ItemsShow() {
  const { items, setItems } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  // console.log(items);


  const categories = ["Pizza", "Burger", "Drinks", "Desserts", "Other", "Combo"];
  console.log("Updating Item:", selectedItem);


  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };
  const handleEditClick = (item) => {
    if (!item._id) {
      console.error("❌ Item does not have a valid MongoDB _id", item);
      return;
    }
    setSelectedItem(item)
  };




  const handleSaveChanges = async (id, updatedData) => {
    console.log(selectedItem);

    try {
      if (!selectedItem?._id) {
        console.error("❌ Food item does not have a valid MongoDB _id", selectedItem);
        return;
      }
      const response = await fetch(`http://localhost:5000/api/food/${selectedItem._id}`, {  // ✅ Use _id
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update item");
      }

      const updatedItem = await response.json();

      // Update frontend state
      // setItems((prevItems) =>
      //   prevItems.items.map((ooo) =>
      //     ooo._id === selectedItem._id
      //       ? {
      //         ...category,
      //         items: category.items.map((item) =>
      //           item._id === selectedItem._id ? { ...item, ...updatedItem.food } : item
      //         ),
      //       }
      //       : category
      //   )
      // );


      setItems((prevItems) =>
        prevItems.items.map((item) =>
          item._id === selectedItem._id ? {
            ...items,
            items: items.items.map((item) => {
              item._id === selectedItem._id ? { ...item, ...updatedItem.food } : item
            })
          } :
            items
        )
      )


      setSelectedItem(null);
    } catch (error) {
      console.error("❌ Error updating item:", error);
    }
  };







  return (
    <>
      {


        <div className="bg-gray-600 w-[100vw] h-[92.9vh] p-4">
          <SearchBar value={searchTerm} onChange={handleSearch} placeholder="Search food items..." />

          {selectedItem ? (
            <EditItem item={selectedItem} onSave={handleSaveChanges} onCancel={() => setSelectedItem(null)} categories={categories} />
          ) : (
            items.map((category) => (
              <div key={category.id}>
                <h1 className="text-white text-xl font-bold">{category.title}</h1>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  {category.items
                    .filter((foodItem) => foodItem.name.toLowerCase().includes(searchTerm))
                    .map((foodItem) => (
                      <div key={foodItem.id} className="bg-gray-700 px-2 py-3 rounded-lg shadow-lg flex flex-col gap-5">
                        <div>
                          <img src={foodItem.image} className="w-[200px]" alt={foodItem.name} />
                        </div>
                        <h1 className="text-white">{foodItem.name}</h1>
                        <h2 className="text-gray-300">${foodItem.price}</h2>
                        <button className="cursor-pointer bg-sky-500 w-full rounded-2xl text-white py-1" onClick={() => handleEditClick(foodItem)}>
                          o'zgartirish
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            ))
          )}
        </div>

      }
    </>


  );
}

export default ItemsShow;
