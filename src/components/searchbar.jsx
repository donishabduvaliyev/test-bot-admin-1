import React from "react";

function SearchBar({ value, onChange, placeholder = "Search..." }) {
    return (
        <div className="w-full max-w-md mx-auto my-4">
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}

export default SearchBar;
