import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { getFoodItems } from "../api";

const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const backEndUrl = "https://test-admin-server-unrz.onrender.com/api";
//   const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await getFoodItems();
        console.log("Fetched items:", response.data);
        // If response is an array directly:
        setItems(response.data); 
        // If response is { foods: [...] }:
        // setItems(response.data.foods); 
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    };

    fetchFoodItems();
  }, []);

  return (
    <ItemsContext.Provider value={{ items, setItems, backEndUrl }}>
      {children}
    </ItemsContext.Provider>
  );
};

export const useItems = () => {
  return useContext(ItemsContext);
};
