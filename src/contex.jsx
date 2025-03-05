import axios from "axios";
import { Children, createContext, useContext, useEffect, useState } from "react";
import { getFoodItems } from "../api";

const createItemsContext = createContext()

export const ItemsContext = ({ children }) => {
    const [items, setItems] = useState([])

    useEffect(() => {
        fetchFoodItems();
    }, []);

    const fetchFoodItems = async () => {
        try {
            const response = await getFoodItems();
            
            setItems(response.data);
        } catch (error) {
            console.error("Error fetching food items:", error);
        }
    };






    return (
        <createItemsContext.Provider value={{ items }} >
            {children}
        </createItemsContext.Provider>
    )


}


export const useCart = () => {
    return useContext(createItemsContext)

}