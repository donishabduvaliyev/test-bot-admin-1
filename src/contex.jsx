import axios from "axios";
import { Children, createContext, useContext, useEffect, useState } from "react";
import { getFoodItems } from "../api";

const createItemsContext = createContext()

export const ItemsContext = async ({ children }) => {
    const [items, setItems] = useState([])

    useEffect(() => {
        fetchFoodItems();
    }, []);

    const fetchFoodItems = async () => {
        try {
            const response = await getFoodItems();
            console.log(response.data);

            setItems(response.data.foods);

        } catch (error) {
            console.error("Error fetching food items:", error);
        }
    };


    const backEndUrl = "https://test-admin-server-unrz.onrender.com/api"
    console.log(items);

    const token = localStorage.getItem("token");

    const res = await fetch(`${backEndUrl}/food`, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    });
  

    // axios.post("https://test-admin-server-unrz.onrender.com/api/food/login", data, {
    //     withCredentials: true
    // });




    return (
        <createItemsContext.Provider value={{ items, setItems, backEndUrl }} >
            {children}
        </createItemsContext.Provider>
    )


}


export const useCart = () => {
    return useContext(createItemsContext)

}