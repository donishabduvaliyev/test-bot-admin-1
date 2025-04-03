import React, { useEffect, useState } from "react";
import uploadImageToImgBB from "../imgbb"; // ImgBB upload function
import { Box, TextField, Button, Card, CardContent, Grid, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Typography } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useCart } from "../contex";

function EditItem({ item, onSave, onCancel, categories }) {
    const [editedData, setEditedData] = useState({
        name: item.name,
        image: item.image, 
        category: item.category,
        price: item.price,
        sizes: item.sizes || [],
        toppings: item.toppings || [],
        isAviable: item.isAviable || false
    });


    const { backEndUrl } = useCart()

    const [newTopping, setNewTopping] = useState("");
    const [newToppingPrice, setNewToppingPrice] = useState("");

    const [isUploading, setIsUploading] = useState(false);
    const [newEditedSize, setNewEditedSize] = useState("")
    const [newEditedSizePrice, setNewEditedSizePrice] = useState("")



    const handleChange = (e) => {
        setEditedData({ ...editedData, [e.target.name]: e.target.value });
    };

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setEditedData({
            ...editedData,
            category: selectedCategory,
          
        });
    };

    const handleAddTopping = () => {
        if (newTopping.trim() !== "" && newToppingPrice !== "") {
            setEditedData({
                ...editedData,
                toppings: [...editedData.toppings, { name: newTopping, price: parseFloat(newToppingPrice) }]
            });
            setNewTopping("");
            setNewToppingPrice("");
        }
    };

    const handleEditTopping = (index, field, value) => {
        const updatedToppings = editedData.toppings.map((topping, i) =>
            i === index ? { ...topping, [field]: value } : topping
        );

        setEditedData({ ...editedData, toppings: updatedToppings });
    };
    const handleRemoveTopping = (index) => {
        setEditedData({
            ...editedData,
            toppings: editedData.toppings.filter((_, i) => i !== index),
        });
    };


    const handleAddNewSize = () => {
        if (newEditedSize.trim() !== "" && newEditedSizePrice !== "") {
            setEditedData({
                ...editedData,
                sizes: [...editedData.sizes, { name: newEditedSize, price: parseFloat(newEditedSizePrice) }]
            });
            setNewEditedSize("");
            setNewEditedSizePrice("");
        }
    };

    const handleEditSize = (index, field, value) => {
        const updatedSizes = editedData.sizes.map((variant, i) =>
            i === index ? { ...variant, [field]: value } : variant
        );

        setEditedData({ ...editedData, sizes: updatedSizes });
    };
    const handleRemoveSize = (index) => {
        setEditedData({
            ...editedData,
            sizes: editedData.sizes.filter((_, i) => i !== index),
        });
    };


    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setIsUploading(true);

        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await fetch(`${backEndUrl}/food/upload`, {
                method: "POST",
                body: formData,

            });

            const data = await response.json();
            if (response.ok) {
                console.log(data);

                setEditedData({ ...editedData, image: data.image });
            } else {
                console.error("Image upload failed:", data.message);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setIsUploading(false);
        }
    };
    const handleIsAviable = (e) => {
        setEditedData({ ...editedData, isAviable: e.target.checked });
    };




    const handleSave = () => {
        const updatedItem = { ...editedData };
        onSave(item.id, updatedItem);
    };
    return (
        <Card sx={{ maxWidth: 500, mx: "auto", my: 4, bgcolor: "#374151", color: "white", boxShadow: 3, borderRadius: 2 }}>
            <CardContent sx={{ maxHeight: "480px", overflowY: "auto", paddingBottom: 2 }}>
                <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
                    Edit Item
                </Typography>
                <Box component="form" noValidate autoComplete="off">
                    <Grid container spacing={2}>
                        {/* Name Input */}
                        <Grid item xs={12}>
                            <TextField fullWidth label="Name" variant="outlined" name="name" value={editedData.name} onChange={handleChange} sx={{ bgcolor: "white", borderRadius: 1 }} />
                        </Grid>

                        {/* Image Upload */}
                        <Grid item xs={12} className="flex flex-col items-center">
                            <label htmlFor="upload-file">
                                <Button variant="contained" component="span" sx={{ bgcolor: "primary.main", display: "flex", alignItems: "center", gap: 1 }}>
                                    <AddPhotoAlternateIcon />
                                    Upload Image
                                </Button>
                            </label>
                            <input type="file" accept="image/*" id="upload-file" hidden onChange={handleImageUpload} />

                            {editedData.image && (
                                <img src={editedData.image} alt="Preview" className="w-32 h-32 mt-2 object-cover rounded-lg" />
                            )}
                        </Grid>

                        {/* Category Selection */}
                        <Grid item xs={12}>
                            <FormControl fullWidth sx={{ bgcolor: "white", borderRadius: 1 }}>
                                <InputLabel>Category</InputLabel>
                                <Select name="category" value={editedData.category} onChange={handleCategoryChange}>
                                    {categories.map((cat) => (
                                        <MenuItem key={cat} value={cat}>
                                            {cat}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Pizza: Size Input */}

                        <>
                            {/* <Grid item xs={12}>
                                <TextField fullWidth label="Size" variant="outlined" name="size" value={editedData.size} onChange={handleChange} placeholder="Enter pizza size (e.g., Small, Medium, Large)" sx={{ bgcolor: "white", borderRadius: 1 }} />
                            </Grid> */}

                            <Grid item xs={6}>
                                <TextField fullWidth label="Variantlar" variant="outlined" value={newEditedSize} onChange={(e) => setNewEditedSize(e.target.value)} placeholder="Add variant" sx={{ bgcolor: "white", borderRadius: 1 }} />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField fullWidth label="narx" type="number" variant="outlined" value={newEditedSizePrice} onChange={(e) => setNewEditedSizePrice(parseFloat(e.target.value) || "")} placeholder="Price" sx={{ bgcolor: "white", borderRadius: 1 }} />
                            </Grid>
                            <Grid item xs={2}>
                                <Button variant="contained" sx={{ bgcolor: "green", color: "white" }} onClick={handleAddNewSize}>+</Button>
                            </Grid>


                            <Grid item xs={12}>
                                {editedData.sizes.map((variant, index) => (
                                    <Grid container spacing={1} alignItems="center" key={index}>
                                        <Grid item xs={5}>
                                            <TextField fullWidth value={variant.name} onChange={(e) => handleEditSize(index, "name", e.target.value)} variant="outlined" sx={{ bgcolor: "white", borderRadius: 1 }} />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField fullWidth type="number" value={variant.price} onChange={(e) => handleEditSize(index, "price", e.target.value)} variant="outlined" sx={{ bgcolor: "white", borderRadius: 1 }} />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Button variant="contained" color="error" onClick={() => handleRemoveSize(index)}>❌</Button>
                                        </Grid>
                                    </Grid>
                                ))}
                            </Grid>

                        </>



                        {/* Combo: Toppings Input */}

                        <>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Topping" variant="outlined" value={newTopping} onChange={(e) => setNewTopping(e.target.value)} placeholder="Add topping" sx={{ bgcolor: "white", borderRadius: 1 }} />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField fullWidth label="Price" type="number" variant="outlined" value={newToppingPrice} onChange={(e) => setNewToppingPrice(parseFloat(e.target.value) || "")} placeholder="Price" sx={{ bgcolor: "white", borderRadius: 1 }} />
                            </Grid>
                            <Grid item xs={2}>
                                <Button variant="contained" sx={{ bgcolor: "green", color: "white" }} onClick={handleAddTopping}>+</Button>
                            </Grid>

                            {/* Toppings List */}
                            <Grid item xs={12}>
                                {editedData.toppings.map((topping, index) => (
                                    <Grid container spacing={1} alignItems="center" key={index}>
                                        <Grid item xs={5}>
                                            <TextField fullWidth value={topping.name} onChange={(e) => handleEditTopping(index, "name", e.target.value)} variant="outlined" sx={{ bgcolor: "white", borderRadius: 1 }} />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField fullWidth type="number" value={topping.price} onChange={(e) => handleEditTopping(index, "price", e.target.value)} variant="outlined" sx={{ bgcolor: "white", borderRadius: 1 }} />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Button variant="contained" color="error" onClick={() => handleRemoveTopping(index)}>❌</Button>
                                        </Grid>
                                    </Grid>
                                ))}
                            </Grid>
                        </>


                        {/* Availability Checkbox */}
                        <Grid item xs={12}>
                            <FormControlLabel control={<Checkbox checked={editedData.isAviable} onChange={handleIsAviable} />} label="Available" />
                        </Grid>

                        {/* Price Input */}
                        <Grid item xs={12}>
                            <TextField fullWidth label="Price" type="number" variant="outlined" name="price" value={editedData.price} onChange={handleChange} sx={{ bgcolor: "white", borderRadius: 1 }} />
                        </Grid>
                    </Grid>
                </Box>
            </CardContent>

            {/* Action Buttons (Always Visible) */}
            <Box sx={{ display: "flex", justifyContent: "space-between", p: 2, bgcolor: "#2D3748" }}>
                <Button fullWidth variant="contained" color="success" sx={{ mr: 1 }} onClick={handleSave} disabled={isUploading}>
                    {isUploading ? "Uploading..." : "Save"}
                </Button>
                <Button fullWidth variant="contained" color="error" onClick={onCancel}>
                    Cancel
                </Button>
            </Box>
        </Card>
    );
}

export default EditItem;
