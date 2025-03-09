import React, { useState } from "react";
import uploadImageToImgBB from "../imgbb"; // ImgBB upload function

function EditItem({ item, onSave, onCancel, categories }) {
    const [editedData, setEditedData] = useState({
        name: item.name,
        imageUrl: item.image, // Store image URL
        category: item.category,
        price: item.price,
        size: item.size || "",
        toppings: item.toppings || [],
    });

    const [newTopping, setNewTopping] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const handleChange = (e) => {
        setEditedData({ ...editedData, [e.target.name]: e.target.value });
    };

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setEditedData({
            ...editedData,
            category: selectedCategory,
            size: selectedCategory === "Pizza" ? "" : null,
            toppings: selectedCategory === "Combo" ? [] : null,
        });
    };

    const handleAddTopping = () => {
        if (newTopping.trim() !== "") {
            setEditedData({ ...editedData, toppings: [...editedData.toppings, newTopping] });
            setNewTopping("");
        }
    };

    const handleRemoveTopping = (topping) => {
        setEditedData({
            ...editedData,
            toppings: editedData.toppings.filter((t) => t !== topping),
        });
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setIsUploading(true);

        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await fetch("http://localhost:5000/api/food/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                setEditedData({ ...editedData, imageUrl: data.imageUrl });
            } else {
                console.error("Image upload failed:", data.message);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setIsUploading(false);
        }
    };



    const handleSave = () => {
        const updatedItem = { ...editedData };
        onSave(item.id, updatedItem);
    };


    return (
        <div className="bg-gray-700 p-4 rounded-lg shadow-lg flex flex-col gap-4">
            <h2 className="text-lg font-bold text-white">Edit Item</h2>

            {/* Name Input */}
            <div className="flex">
                <label className="block text-white">Name:</label>
                <input
                    type="text"
                    name="name"
                    value={editedData.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-400 rounded-lg"
                />

                {/* Image Upload & Preview */}
                <label className="block text-white">Image:</label>
                {editedData.imageUrl && (
                    <img src={editedData.imageUrl} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
                )}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full p-2 border border-gray-400 rounded-lg bg-white"
                />
                {isUploading && <p className="text-yellow-400">Uploading...</p>}

                {/* Category Selection */}
                <label className="block text-white">Category:</label>
                <select
                    name="category"
                    value={editedData.category}
                    onChange={handleCategoryChange}
                    className="w-full p-2 border border-gray-400 rounded-lg"
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                {/* Pizza: Size Input */}
                {editedData.category === "Pizza" && (
                    <>
                        <label className="block text-white">Size:</label>
                        <input
                            type="text"
                            name="size"
                            value={editedData.size}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-400 rounded-lg"
                            placeholder="Enter pizza size (e.g., Small, Medium, Large)"
                        />
                    </>
                )}

                {/* Combo: Toppings Input */}
                {editedData.category === "Combo" && (
                    <>
                        <label className="block text-white">Toppings:</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newTopping}
                                onChange={(e) => setNewTopping(e.target.value)}
                                className="w-full p-2 border border-gray-400 rounded-lg"
                                placeholder="Add topping"
                            />
                            <button className="bg-green-500 text-white px-4 py-2 rounded-lg" onClick={handleAddTopping}>
                                +
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {editedData.toppings.map((topping, index) => (
                                <div key={index} className="bg-gray-500 text-white px-3 py-1 rounded-lg flex items-center">
                                    {topping}
                                    <button className="ml-2 text-red-500" onClick={() => handleRemoveTopping(topping)}>
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* Price Input */}
                <label className="block text-white">Price:</label>
                <input
                    type="number"
                    name="price"
                    value={editedData.price}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-400 rounded-lg"
                />

                {/* Action Buttons */}
                <div className="flex justify-between mt-4">
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg" onClick={handleSave} disabled={isUploading}>
                        {isUploading ? "Uploading..." : "Save"}
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditItem;
