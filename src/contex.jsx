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
            console.log(response.data);

            setItems(response.data);

        } catch (error) {
            console.error("Error fetching food items:", error);
        }
    };


    const backEndUrl= "http://localhost:5000/api"



    


    return (
        <createItemsContext.Provider value={{ items, setItems , backEndUrl }} >
            {children}
        </createItemsContext.Provider>
    )


}


export const useCart = () => {
    return useContext(createItemsContext)

}