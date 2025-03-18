import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../contex";

function ChangeCredentials() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {backEndUrl}= useCart()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token"); // Get JWT token
            const response = await axios.put(
                `${backEndUrl}/food/updateAdmin`,
                { username, password },
                { headers: { Authorization: token } }
            );

            alert(response.data.message);
            navigate("/"); // Redirect to home after update
        } catch (error) {
            alert("Error updating credentials");
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Update Credentials
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="New Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="New Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Update
                </Button>
            </form>
        </Container>
    );
}

export default ChangeCredentials;
