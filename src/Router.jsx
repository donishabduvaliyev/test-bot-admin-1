import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Crud from "./pages/Crud";
import StoredItems from "./pages/StoredItems";
import ItemsShow from "./pages/ItemsShow";
import Layout from "./Layout/Layout";
import Login from "./pages/LogIn";
import ChangeCredentials from "./pages/changeAccount";

// Function to check if user is authenticated
const isAuthenticated = () => {
    return localStorage.getItem("isAuthenticated") === "true";
};

// Private Route Wrapper
const PrivateRoute = ({ element }) => {
    return isAuthenticated() ? element : <Navigate to="/login" />;
};

function RouterPage() {
    return (
        <Routes>
            {/* Login Route */}
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route path="/" element={<Layout />}>
                <Route index element={<ItemsShow />} />
                <Route path="crud" element={<PrivateRoute element={<Crud />} />} />
                <Route path="storedItems" element={<PrivateRoute element={<StoredItems />} />} />
            </Route>
            <Route path="changeAccount" element={<ChangeCredentials />} />
        </Routes>
    );
}

export default RouterPage;
