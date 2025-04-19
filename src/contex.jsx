import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const ItemsContextObj = createContext();

export const ItemsContext = ({ children }) => {
    const [items, setItems] = useState([]);
    const backEndUrl = "https://test-admin-server-unrz.onrender.com/api";

    useEffect(() => {
        const fetchFoodItems = async () => {
            try {
                const response = await axios.get(`${backEndUrl}/food`);
                setItems(response.data);
                console.log("Fetched items:", response.data);
            } catch (error) {
                console.error("Error fetching food items:", error);
            }
        };

        fetchFoodItems();
    }, []);

    return (
        <ItemsContextObj.Provider value={{ items, setItems, backEndUrl }}>
            {children}
        </ItemsContextObj.Provider>
    );
};

export const useCart = () => {
    return useContext(ItemsContextObj);
};
