import React, { useState } from "react";
import axios from "axios";
import { useCart } from "../contex";
import { TextField, Button, Card, CardContent, Typography, CircularProgress } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

function Broadcast() {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const { backEndUrl } = useCart();

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await axios.post(`${backEndUrl}/food/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setImageUrl(response.data.image);
        } catch (error) {
            alert("Image upload failed");
        }
        setLoading(false);
    };

    const sendMessage = async () => {
        if (!title || !message || !imageUrl) {
            alert("Title and message are required");
            return;
        }

        try {
            await axios.post(`${backEndUrl}/food/send-broadcast`, {
                title,
                message,
                imageUrl,
            });
            alert("Message sent successfully!");
            setTitle("");
            setMessage("");
            setImage(null);
            setImageUrl("");
        } catch (error) {
            alert("Failed to send message.");
        }
    };
    // const token = localStorage.getItem("token");

    // const res = await fetch(`${backEndUrl}/food`, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });


    return (
        <Card sx={{ maxWidth: 500, margin: "auto", padding: 2, mt: 3 }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    Send Broadcast Message
                </Typography>

                <TextField
                    fullWidth
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    margin="normal"
                />

                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    margin="normal"
                />

                <input
                    accept="image/*"
                    type="file"
                    style={{ display: "none" }}
                    id="upload-button"
                    onChange={handleImageUpload}
                />
                <label htmlFor="upload-button">
                    <Button
                        variant="contained"
                        component="span"
                        startIcon={<CloudUploadIcon />}
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Upload Image
                    </Button>
                </label>

                {loading && <CircularProgress sx={{ mt: 2 }} />}

                {imageUrl && (
                    <img src={imageUrl} alt="Uploaded" style={{ width: "100%", marginTop: 10, borderRadius: 8 }} />
                )}

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={sendMessage}
                >
                    Send Broadcast
                </Button>
            </CardContent>
        </Card>
    );
}

export default Broadcast;
