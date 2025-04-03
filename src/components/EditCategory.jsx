// import React, { useState } from 'react';
// import { TextField, Button, IconButton, Box, Typography, Paper } from '@mui/material';
// import { Add, Delete } from '@mui/icons-material';

// function EditCategory({ items, onUpdate }) {
//     const [categories, setCategories] = useState(items[0]?.categories || []);

//     const handleCategoryChange = (index, value) => {
//         const updatedCategories = [...categories];
//         updatedCategories[index] = value;
//         setCategories(updatedCategories);
//     };

//     const handleAddCategory = () => {
//         setCategories([...categories, '']);
//     };

//     const handleDeleteCategory = (index) => {
//         const updatedCategories = categories.filter((_, i) => i !== index);
//         setCategories(updatedCategories);
//     };

//     const handleSave = () => {
//         onUpdate(categories);
//     };

//     return (
//         <Paper sx={{ p: 2, maxWidth: 400, mx: 'auto', mt: 3 }}>
//             <Typography variant="h6" gutterBottom> Edit Categories </Typography>
//             {categories.map((category, index) => (
//                 <Box key={index} display="flex" alignItems="center" gap={1} mb={1}>
//                     <TextField
//                         fullWidth
//                         variant="outlined"
//                         size="small"
//                         value={category}
//                         onChange={(e) => handleCategoryChange(index, e.target.value)}
//                     />
//                     <IconButton color="error" onClick={() => handleDeleteCategory(index)}>
//                         <Delete />
//                     </IconButton>
//                 </Box>
//             ))}
//             <Button startIcon={<Add />} onClick={handleAddCategory} fullWidth sx={{ mb: 2 }}> Add Category </Button>
//             <Button variant="contained" color="primary" fullWidth onClick={handleSave}> Save Changes </Button>
//         </Paper>
//     );
// }

// export default EditCategory;
