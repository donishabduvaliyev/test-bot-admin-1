import React, { useEffect, useState } from "react";
import { useCart } from "../contex";
import SearchBar from "../components/searchbar";
import EditItem from "../components/EditItem";
import { Box, Typography, Card, CardMedia, CardContent, Button, Grid, TextField } from "@mui/material";
function ItemsShow() {
  const { items, setItems, backEndUrl } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  // console.log(items, "bu");


  const categories = items.categories
  // console.log(categories);

  // console.log("Updating Item:", selectedItem);


  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };
  const handleEditClick = (item) => {
    if (!item._id) {
      console.error("❌ Item does not have a valid MongoDB _id", item);
      return;
    }
    setSelectedItem(item)
  };



  

  // const token = localStorage.getItem("token");

  // const res = await fetch(`${backEndUrl}/food`, {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });



  const handleSaveChanges = async (id, updatedData) => {
    // console.log(selectedItem);
    // console.log("ozgartirilgan malumot ", updatedData);

    try {
      if (!selectedItem?._id) {
        console.error("❌ Food item does not have a valid MongoDB _id", selectedItem);
        return;
      }
      const response = await fetch(`${backEndUrl}/food/${selectedItem._id}`, {  // ✅ Use _id
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),


      });
      console.log("Json formatdagi malumot", JSON.stringify(updatedData))
      if (!response.ok) {
        throw new Error("Failed to update item");
      }

      const updatedItem = await response.json();

      // Update frontend state
      // setItems((prevItems) =>
      //   prevItems.items.map((ooo) =>
      //     ooo._id === selectedItem._id
      //       ? {
      //         ...category,
      //         items: category.items.map((item) =>
      //           item._id === selectedItem._id ? { ...item, ...updatedItem.food } : item
      //         ),
      //       }
      //       : category
      //   )
      // );
      // console.log('mavjud itemlar', items);
      console.log("back enddan kelgan ", updatedItem);


      setItems((prevItems) =>
        prevItems.map((category) => ({
          ...category,
          items: category.items.map((item) =>
            item._id === selectedItem._id ? { ...item, ...updatedItem.food } : item,
            console.log('items updated succesfully 111111')

          ),
        }))
      );



      setSelectedItem(null);
    } catch (error) {
      console.error("❌ Error updating item:", error);
    }
  };







  return (
    <>
      {


        <Box sx={{ width: "100vw", height: "92.9vh", bgcolor: "#4B5563", p: 4, overflowY: "auto" }}>
          {/* Search Bar */}
          <TextField
            fullWidth
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search food items..."
            sx={{
              mb: 3,
              bgcolor: "white",
              borderRadius: 1,
            }}
          />

          {selectedItem ? (
            <EditItem item={selectedItem} onSave={handleSaveChanges} onCancel={() => setSelectedItem(null)} categories={categories} />
          ) : (
            items.map((category) => (
              <Box key={category._id} mb={4}>
                <Typography variant="h5" color="white" fontWeight="bold" mb={2}>
                  {category.title}
                </Typography>

                {/* Responsive Grid for Food Items */}
                <Grid container spacing={3}>
                  {category.items
                    .filter((foodItem) => foodItem.name.toLowerCase().includes(searchTerm))
                    .map((foodItem) => (
                      <Grid item xs={12} sm={6} md={4} lg={2} key={foodItem._id}>
                        <Card
                          sx={{
                            bgcolor: foodItem.isAviable ? "#374151" : "#DC2626",
                            color: "white",
                            boxShadow: 3,
                            borderRadius: 2,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textAlign: "center",
                            p: 2,
                          }}
                        >
                          <CardMedia
                            component="img"
                            image={foodItem.image}
                            alt={foodItem.name}
                            sx={{ width: "100%", height: 150, objectFit: "cover", borderRadius: 2 }}
                          />

                          <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                            {/* Truncated Name */}
                            <Typography
                              variant="h6"
                              sx={{
                                fontSize: "14px",
                                fontWeight: "bold",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                width: "100%",
                              }}
                            >
                              {foodItem.name}
                            </Typography>

                            <Typography variant="body1" color="gray">${foodItem.price}</Typography>
                          </CardContent>

                          <Button
                            variant="contained"
                            fullWidth
                            sx={{ bgcolor: "#0EA5E9", color: "white", mt: 1, borderRadius: 2 }}
                            onClick={() => handleEditClick(foodItem)}
                          >
                            O'zgartirish
                          </Button>
                        </Card>
                      </Grid>
                    ))}
                </Grid>
              </Box>
            ))
          )}
        </Box>

      }
    </>


  );
}

export default ItemsShow;
