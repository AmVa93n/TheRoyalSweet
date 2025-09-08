import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField, IconButton, Button, Box, Typography, Autocomplete, List, ListItem, DialogContent } from "@mui/material";
import { useState } from "react";
import type { Ingredient, Product } from "../../types";
import { useStore } from "../../store";
import adminService from '../../services/admin.service'
import { TrashIcon, FloppyDiskIcon, XIcon } from "@phosphor-icons/react";

type Props = {
    product?: Product;
    onClose: () => void;
};

export default function EditProductModal({ product, onClose }: Props) {
    const { ingredients, products, setProducts } = useStore();
    const [productForm, setProductForm] = useState(product as Product);
    const [newIngredientId, setNewIngredientId] = useState(""); // New ingredient input
    const [newAmount, setNewAmount] = useState(0); // New amount input

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        if (name.includes(".")) {
            setProductForm((prev) => {
                const [field, lang] = name.split(".");
                return {...prev, [field]: {...prev[field], [lang]: value }};
            });
            return;
        }
        setProductForm({ ...productForm, [name]: value });
    };

    function handleAddIngredient() {
        setProductForm((prev) => ({
            ...prev,
            recipe: [
                ...prev.recipe,
                {
                    ingredient: ingredients.find(ingredient => ingredient._id === newIngredientId) as Ingredient,
                    amount: newAmount
                }
            ]
        }));
        setNewIngredientId(""); // Clear input
        setNewAmount(0); // Clear amount
    };
    
    function handleDeleteIngredient(ingredientId: string) {
        setProductForm((prev) => ({
            ...prev,
            recipe: prev.recipe.filter(item => item.ingredient._id !== ingredientId)
        }));
    };

    function handleChangeImage(index: number, newUrl: string) {
        setProductForm((prev) => ({ ...prev, images: prev.images.map((url, i) => i === index ? newUrl : url) }));
    };

    async function handleSave() {
        try {
            const updatedProduct = await adminService.updateProduct(productForm);
            const updatedProducts = products.map((product) => product._id === updatedProduct._id ? updatedProduct : product);
            setProducts(updatedProducts);
        } catch (error) {
            console.error("Failed to save product:", error);
        }
        onClose(); // Close the modal after saving
    };

    return (
        <div className="pt-24 pb-12 px-6 lg:px-16 min-h-screen">
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField name="name.en" label="Name (EN)" value={productForm.name.en} onChange={handleChange} size="small" fullWidth/>
                    <TextField name="name.pt" label="Name (PT)" value={productForm.name.pt} onChange={handleChange} size="small" fullWidth/>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField name="intro.en" label="Intro (EN)" value={productForm.intro.en} onChange={handleChange} size="small" multiline fullWidth/>
                    <TextField name="intro.pt" label="Intro (PT)" value={productForm.intro.pt} onChange={handleChange} size="small" multiline fullWidth/>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField name="description.en" label="Description (EN)" value={productForm.description.en} onChange={handleChange} size="small" multiline fullWidth/>
                    <TextField name="description.pt" label="Description (PT)" value={productForm.description.pt} onChange={handleChange} size="small" multiline fullWidth/>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField name="serve.en" label="Serve (EN)" value={productForm.serve.en} onChange={handleChange} size="small" fullWidth/>
                    <TextField name="serve.pt" label="Serve (PT)" value={productForm.serve.pt} onChange={handleChange} size="small" fullWidth/>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField name="store.en" label="Store (EN)" value={productForm.store.en} onChange={handleChange} size="small" fullWidth/>
                    <TextField name="store.pt" label="Store (PT)" value={productForm.store.pt} onChange={handleChange} size="small" fullWidth/>
                </Box>
                
                <TextField name="category" label="Category" value={productForm.category} onChange={handleChange} size="small" fullWidth/>
                <TextField name="workHours" label="Work Hours" value={productForm.workHours} onChange={handleChange} type="number" size="small" />
                <TextField name="electricityHours" label="Electricity Hours" value={productForm.electricityHours} onChange={handleChange} type="number" size="small" />
                
                {productForm.images.map((url, index) => (
                    <TextField key={index} label={`Image  ${index+1}`} value={url} onChange={(e)=> handleChangeImage(index, e.target.value)} size="small"/>
                ))}
                
                <Box>
                    <Typography variant="body2">Ingredients:</Typography>
                    <List>
                        {productForm.recipe.map((item) => (
                        <ListItem key={item.ingredient._id} dense>
                            <Typography variant="body2">{item.ingredient.name}: {item.amount} {item.ingredient.recipeUnits}</Typography>
                            <IconButton onClick={() => handleDeleteIngredient(item.ingredient._id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                        ))}
                    </List>
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Autocomplete
                        options={ingredients} // Pass the whole ingredient object
                        getOptionLabel={(option) => option.name} // Display the ingredient name in the dropdown
                        value={ingredients.find(ingredient => ingredient._id === newIngredientId) || null} // Find the selected ingredient by ID
                        onChange={(_, newValue) => setNewIngredientId(newValue?._id || "")} // Store the ingredient's ID
                        renderInput={(params) => (
                            <TextField {...params} placeholder="Select Ingredient" size="small" />
                        )}
                        sx={{ width: 300 }}
                    />
                    <TextField
                        value={newAmount}
                        onChange={(e) => setNewAmount(Number(e.target.value))}
                        placeholder="Amount"
                        type="number"
                        size="small"
                        sx={{ width: 100 }}
                    />
                    <Button
                        variant="contained"
                        onClick={() => handleAddIngredient()}
                        startIcon={<AddIcon />}
                    >
                        Add
                    </Button>
                </Box>
            </DialogContent>

            {/* Actions */}
            <button
                onClick={handleSave}
                className="fixed bottom-8 right-24 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition transform hover:scale-105 cursor-pointer"
                title="Edit Order"
            >
                <FloppyDiskIcon size={24} />
            </button>
            <button
                onClick={onClose}
                className="fixed bottom-8 right-8 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg transition transform hover:scale-105 cursor-pointer"
                title="Edit Order"
            >
                <XIcon size={24} />
            </button>
        </div>
    )
}