import React, { useState } from 'react';
import { useCart } from '../contex';
import { Box, TextField, Button, Card, CardContent, Grid, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Typography } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
// import EditCategory from '../components/EditCategory';

function Crud() {  // Accept `categories` as a prop
  const [newItem, setNewItem] = useState({
    name: '',
    image: '',
    category: '',
    price: '',
    isAviable: false,
    sizes: [],
    toppings: [],
    combo: []

  });

  const { items, setitems, backEndUrl } = useCart()
  const [newTopping, setNewTopping] = useState("");
  const [newToppingPrice, setNewToppingPrice] = useState("");
  const [newAddition, setNewAddition] = useState("")
  const [newAdditionPrice, setNewAdditionPrice] = useState("")
  const [isUploading, setIsUploading] = useState(false);
  const categories = ["Pizza", "Burger", "Drinks", "Desserts", "Other", "Combo"];
  const [comboItem, setComboItem] = useState("")
  const [comboItemPrice, setComboItemPrice] = useState("")



  // const token = localStorage.getItem("token");

  // const res = await fetch(`${backEndUrl}/food`, {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });


  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setNewItem({ ...newItem, category: e.target.value, toppings: [] });
  };

  // const handleAddCombo = () => {
  //   if (comboItem.trim() !== "" && comboItemPrice !== "") {
  //     setNewItem({
  //       ...newItem,
  //       combo: [...newItem.combo, { name: comboItem, price: parseFloat(comboItemPrice) }]
  //     });
  //     setComboItem("");
  //     setComboItemPrice("");
  //   }
  // };

  // const handleRemoveCombo = (index) => {
  //   setNewItem({
  //     ...newItem,
  //     combo: newItem.combo.filter((_, i) => i !== index),
  //   });
  // };

  const handleAddTopping = () => {
    if (newTopping.trim() !== "" && newToppingPrice !== "") {
      setNewItem({
        ...newItem,
        toppings: [...newItem.toppings, { name: newTopping, price: parseFloat(newToppingPrice) }]
      });
      setNewTopping("");
      setNewToppingPrice("");
    }
  };

  const handleAddAddition = () => {
    if (newAddition.trim() !== "" && newAdditionPrice !== "") {
      setNewItem({
        ...newItem,
        sizes: [...newItem.sizes, { name: newAddition, price: parseFloat(newAdditionPrice) }]
      });
      setNewAddition("");
      setNewAdditionPrice("");
    }
  };

  const handleRemoveAddition = (index) => {
    setNewItem({
      ...newItem,
      sizes: newItem.sizes.filter((_, i) => i !== index),
    });
  };
  const handleRemoveTopping = (index) => {
    setNewItem({
      ...newItem,
      toppings: newItem.toppings.filter((_, i) => i !== index),
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

        setNewItem({ ...newItem, image: data.image });
      } else {
        console.error("Image upload failed:", data.message);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };



  const handleSave = async (e) => {
    e.preventDefault();
    console.log(newItem);


    if (!newItem.name || !newItem.price || !newItem.category || !newItem.image) {
      alert("Please fill all required fields and upload an image.");
      return;
    }

    setIsUploading(true);

    try {
      const foodData = {
        name: newItem.name,
        price: newItem.price,
        category: newItem.category,
        sizes: newItem.sizes || [], // Ensure it's an array
        toppings: newItem.toppings || [], // Ensure it's an array
        image: newItem.image, // Cloudinary URL
        isAvailable: newItem.isAviable
      };

      console.log("Sending Data:", foodData); // 🔥 Debugging

      const response = await fetch("http://localhost:5000/api/food/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // ✅ Set JSON headers
        body: JSON.stringify(foodData), // ✅ Convert object to JSON string
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) throw new Error(data.message || "Failed to add food item.");

      alert("Food item added successfully!");
      setNewItem({ name: "", price: "", section: "", sizes: [], toppings: [], image: "" });

    } catch (error) {
      console.error("Error adding food:", error);
      alert("Failed to add food item.");
    } finally {
      setIsUploading(false);
    }
  };

  const onCancel = () => {
    setNewItem({
      name: '',
      image: '',
      category: '',
      price: '',
      isAviable: '',
      sizes: [],
      toppings: [],
    });
  };

  return (
    <>
      <Card sx={{ maxWidth: 500, mx: "auto", my: 4, bgcolor: "#374151", color: "white", boxShadow: 3, borderRadius: 2 }}

      >
        <CardContent sx={{ maxHeight: "500px", overflowY: "auto", paddingBottom: 2 }}>
          <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
            Mahsulot qo'shish
          </Typography>

          <Box component="form" noValidate autoComplete="off">
            <Grid container spacing={2}>
              {/* Name Input */}
              <Grid item xs={12}>
                <TextField fullWidth label="Mahsulot nomi" variant="outlined" name="name" value={newItem.name} onChange={handleChange} sx={{ bgcolor: "white", borderRadius: 1 }} />
              </Grid>

              {/* Image Upload */}
              <Grid item xs={10} className="flex flex-col items-center">
                <label htmlFor="upload-file">
                  <Button variant="contained" component="span" sx={{ bgcolor: "primary.main", display: "flex", alignItems: "center", gap: 1 }}>
                    <AddPhotoAlternateIcon />
                    Rasm yuklash
                  </Button>
                </label>
                <input type="file" accept="image/*" id="upload-file" hidden onChange={handleImageUpload} />

                {newItem.image && (
                  <img src={newItem.image} alt="rasm" className="w-40 h-40 mt-2 object-cover rounded-lg" />
                )}
              </Grid>

              {/* Category Selection */}
              <Grid item xs={12}>
                <FormControl fullWidth sx={{ bgcolor: "white", borderRadius: 1 }}>
                  <InputLabel>Kategoriya</InputLabel>
                  <Select name="Kategoriya" value={newItem.category} onChange={handleCategoryChange}>
                    {categories.map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {cat}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Pizza: Size Input */}

              {/* {
          newItem.category !== 'Combo' ? */}
              <>
                <div className='bg-red-300 contents '>
                  <Grid item xs={6}>
                    <TextField fullWidth label="Variantlar" variant="outlined" value={newAddition} onChange={(e) => setNewAddition(e.target.value)} placeholder="Add variant" sx={{ bgcolor: "white", borderRadius: 1 }} />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField fullWidth label="narx" type="number" variant="outlined" value={newAdditionPrice} onChange={(e) => setNewAdditionPrice(parseFloat(e.target.value) || "")} placeholder="Price" sx={{ bgcolor: "white", borderRadius: 1 }} />
                  </Grid>
                  <Grid item xs={2}>
                    <Button variant="contained" sx={{ bgcolor: "green", color: "white" }} onClick={handleAddAddition}>+</Button>
                  </Grid>


                  <Grid item xs={12}>
                    {newItem.sizes.map((variant, index) => (
                      <Grid container spacing={1} alignItems="center" key={index}>
                        <Grid item xs={5}>
                          <TextField fullWidth value={variant.name} variant="outlined" sx={{ bgcolor: "white", borderRadius: 1 }} disabled />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField fullWidth type="number" value={variant.price} variant="outlined" sx={{ bgcolor: "white", borderRadius: 1 }} disabled />
                        </Grid>
                        <Grid item xs={3}>
                          <Button variant="contained" color="error" onClick={() => handleRemoveAddition(index)}>❌</Button>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                </div>




                <div className='  contents bg-green-200  '>
                  <Grid item xs={6}>
                    <TextField fullWidth label="qo'shimcha" variant="outlined" value={newTopping} onChange={(e) => setNewTopping(e.target.value)} placeholder="Add topping" sx={{ bgcolor: "white", borderRadius: 1 }} />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField fullWidth label="narx" type="number" variant="outlined" value={newToppingPrice} onChange={(e) => setNewToppingPrice(parseFloat(e.target.value) || "")} placeholder="Price" sx={{ bgcolor: "white", borderRadius: 1 }} />
                  </Grid>
                  <Grid item xs={2}>
                    <Button variant="contained" sx={{ bgcolor: "green", color: "white" }} onClick={handleAddTopping}>+</Button>
                  </Grid>

                  {/* Toppings List */}
                  <Grid item xs={12}>
                    {newItem.toppings.map((topping, index) => (
                      <Grid container spacing={1} alignItems="center" key={index}>
                        <Grid item xs={5}>
                          <TextField fullWidth value={topping.name} variant="outlined" sx={{ bgcolor: "white", borderRadius: 1 }} disabled />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField fullWidth type="number" value={topping.price} variant="outlined" sx={{ bgcolor: "white", borderRadius: 1 }} disabled />
                        </Grid>
                        <Grid item xs={3}>
                          <Button variant="contained" color="error" onClick={() => handleRemoveTopping(index)}>❌</Button>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                </div>

              </>
              {/* <>
              <Grid item xs={6}>
                <TextField fullWidth label="combo" variant="outlined" value={comboItem} onChange={(e) => setComboItem (e.target.value)} placeholder="mahsulot qo'sh" sx={{ bgcolor: "white", borderRadius: 1 }} />
              </Grid>
              <Grid item xs={4}>
                <TextField fullWidth label="narx" type="number" variant="outlined" value={comboItemPrice} onChange={(e) => setComboItemPrice(parseFloat(e.target.value) || "")} placeholder="Price" sx={{ bgcolor: "white", borderRadius: 1 }} />
              </Grid>
              <Grid item xs={2}>
                <Button variant="contained" sx={{ bgcolor: "green", color: "white" }} onClick={handleAddCombo}>+</Button>
              </Grid>

            
              <Grid item xs={12}>
                {newItem.combo.map((item, index) => (
                  <Grid container spacing={1} alignItems="center" key={index}>
                    <Grid item xs={5}>
                      <TextField fullWidth value={item.name} variant="outlined" sx={{ bgcolor: "white", borderRadius: 1 }} disabled />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField fullWidth type="number" value={item.price} variant="outlined" sx={{ bgcolor: "white", borderRadius: 1 }} disabled />
                    </Grid>
                    <Grid item xs={3}>
                      <Button variant="contained" color="error" onClick={() => handleRemoveCombo(index)}>❌</Button>
                    </Grid>
                  </Grid>
                ))}
              </Grid>

              <div>

              </div>
            </> */}



              {/* Price Input */}
              <Grid item xs={12}>
                <TextField fullWidth label="narx" type="number" variant="outlined" name="price" value={newItem.price} onChange={handleChange} sx={{ bgcolor: "white", borderRadius: 1 }} />
              </Grid>
            </Grid>
          </Box>
        </CardContent>

        {/* Action Buttons (Always Visible) */}
        <Box sx={{ display: "flex", justifyContent: "space-between", p: 2, bgcolor: "#2D3748" }}>
          <Button fullWidth variant="contained" color="success" sx={{ mr: 1 }} onClick={handleSave} disabled={isUploading}>
            {isUploading ? "Uploading..." : "Saqlash"}
          </Button>
          <Button fullWidth variant="contained" color="error" onClick={onCancel}>
            Bekor qilish
          </Button>
        </Box>
      </Card>
      {/* <EditCategory items={items} /> */}
    </>
  );
}

export default Crud;
