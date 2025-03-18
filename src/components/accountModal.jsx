import React, { useState } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

function AccountModal() {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    // Open Dropdown Menu
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Close Dropdown Menu
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Logout Function
    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token
        navigate("/login"); // Redirect to login
    };



    return (
        <div>
            {/* Icon to trigger dropdown */}
            <IconButton onClick={handleMenuOpen} color="inherit">
                <AccountCircleIcon />
            </IconButton>

            {/* Dropdown Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <MenuItem onClick={() => { navigate("/changeAccount"); handleMenuClose(); }}>
                    O'zgartirish
                </MenuItem>
                <MenuItem onClick={handleLogout}>Chiqish</MenuItem>
            </Menu>
        </div>
    );
}

export default AccountModal;
