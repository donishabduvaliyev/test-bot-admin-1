import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";
import axios from "axios";
import { useCart } from "../contex";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { backEndUrl } = useCart()


    const handleLogin = async () => {
        try {
            const response = await axios.post(`${backEndUrl}/food/login`, {
                username,
                password,
            });

            localStorage.setItem("token", response.data.token); // Store JWT token
            navigate("/crud"); // Redirect to admin panel
        } catch (err) {
            console.log(err)
            setError("Invalid username or password!");
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} style={{ padding: "20px", marginTop: "50px" }}>
                <Typography variant="h5" align="center">Admin Login</Typography>

                {error && <Typography color="error">{error}</Typography>}

                <TextField
                    fullWidth
                    label="Username"
                    variant="outlined"
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                    style={{ marginTop: "10px" }}
                >
                    Login
                </Button>
            </Paper>
        </Container>
    );
}

export default Login;
