import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Crud from "./pages/Crud";
import StoredItems from "./pages/StoredItems";
import ItemsShow from "./pages/ItemsShow";
import Layout from "./Layout/Layout";
import Login from "./pages/LogIn";
import ChangeCredentials from "./pages/changeAccount";
import Broadcast from "./pages/Broadcast";

// Function to check if user is authenticated
// const isAuthenticated = () => {
//     const authFlag = localStorage.getItem("isAuthenticated") === "true";
//     // Log what the flag value is initially
//     console.log('isAuthenticated check - localStorage value:', localStorage.getItem("isAuthenticated"), 'Result:', authFlag);
//     return authFlag;
// };

// const PrivateRoute = ({ element }) => {
//     const authenticated = isAuthenticated();
//     // Log the result passed to PrivateRoute
//     console.log('PrivateRoute check - authenticated:', authenticated);
//     if (!authenticated) {
//         // Log if navigation should happen
//         console.log('PrivateRoute: Navigating to /login');
//     }
//     return authenticated ? element : <Navigate to="/login" />;
// };

function RouterPage() {
    return (
        <Routes>
            {/* Login Route */}
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route path="/" element={<Layout />}>
                <Route index element={<ItemsShow />}  />
                <Route path="crud" element={<Crud />}  />
                <Route path="changeBot" element={<StoredItems />}  />
                <Route path="broadcast" element={<Broadcast />} />
            </Route>
            {/* <Route path="changeAccount" element={<ChangeCredentials />} /> */}
        </Routes>
    );
}

export default RouterPage;
