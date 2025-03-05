import React, { useState } from "react";
import { useCart } from "../contex";
import SearchBar from "../components/searchbar"; // Import the SearchBar component

function ItemsShow() {
  const { items } = useCart();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  return (
    <div className="bg-gray-600 w-[100vw] h-[92.9vh] p-4">
      <SearchBar value={searchTerm} onChange={handleSearch} placeholder="Search food items..." />

      {items.map((category) => (
        <div key={category.id}>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {category.items
              .filter((foodItem) => foodItem.name.toLowerCase().includes(searchTerm))
              .map((foodItem) => (
                <div
                  key={foodItem.id}
                  className="bg-gray-700 px-2 py-3 rounded-lg shadow-lg flex flex-col gap-5"
                >
                  <div>
                    <img src={foodItem.image} className="w-[200px]" alt={foodItem.name} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h1>{foodItem.name}</h1>
                    <h2>500 gr</h2>
                  </div>
                  <button className="cursor-pointer bg-sky-500 w-full rounded-2xl">
                    o'zgartirish
                  </button>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ItemsShow;
