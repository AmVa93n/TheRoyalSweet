import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField, IconButton, Button, Box, Typography, Autocomplete, List, ListItem, DialogContent, DialogActions } from "@mui/material";
import { useState } from "react";
import type { Ingredient, CakeComponent } from "../../types";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { useStore } from "../../store";
import adminService from '../../services/admin.service'

type Props = {
    cakeComponent?: CakeComponent;
    onClose: () => void;
};

export default function EditCakeComponent({ cakeComponent, onClose }: Props) {
    const { ingredients, cakeComponents, setCakeComponents } = useStore();
    const [cakeComponentForm, setCakeComponentForm] = useState(cakeComponent as CakeComponent);
    const [newIngredientId, setNewIngredientId] = useState(""); // New ingredient input
    const [newAmount, setNewAmount] = useState(0); // New amount input

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        if (name.includes(".")) {
            setCakeComponentForm((prev) => {
                const [field, lang] = name.split(".");
                return {...prev, [field]: {...prev[field], [lang]: value }};
            });
            return;
        }
        setCakeComponentForm({ ...cakeComponentForm, [name]: value });
    };

    function handleAddIngredient() {
        setCakeComponentForm((prev) => ({
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
        setCakeComponentForm((prev) => ({
            ...prev,
            recipe: prev.recipe.filter(item => item.ingredient._id !== ingredientId)
        }));
    };

    async function handleSave() {
        try {
            const updatedCakeComponent = await adminService.updateCakeComponent(cakeComponentForm);
            const updatedCakeComponents = cakeComponents.map((cakeComponent) => cakeComponent._id === updatedCakeComponent._id ? updatedCakeComponent : cakeComponent);
            setCakeComponents(updatedCakeComponents);
        } catch (error) {
            console.error("Failed to save cake component:", error);
        }
        onClose();
    };

    return (
        <div className="pt-24 pb-12 px-6 lg:px-16 min-h-screen">
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField name="name.en" label="Name (EN)" value={cakeComponentForm.name.en} onChange={handleChange} size="small" fullWidth/>
                    <TextField name="name.pt" label="Name (PT)" value={cakeComponentForm.name.pt} onChange={handleChange} size="small" fullWidth/>
                </Box>

                <TextField name="category" label="Category" value={cakeComponentForm.category} onChange={handleChange} size="small" fullWidth/>
                <TextField name="workHours" label="Work Hours" value={cakeComponentForm.workHours} onChange={handleChange} type="number" size="small" />
                <TextField name="electricityHours" label="Electricity Hours" value={cakeComponentForm.electricityHours} onChange={handleChange} type="number" size="small" />
                
                <Box>
                    <Typography variant="body2">Ingredients:</Typography>
                    <List>
                        {cakeComponentForm.recipe.map((item) => (
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
            <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={handleSave} startIcon={<DoneIcon />} color="success" variant="contained">
                    Save Changes
                </Button>
                <Button onClick={onClose} startIcon={<CloseIcon />} color="error" variant="outlined">
                    Discard
                </Button>
            </DialogActions>
        </div>
    )
}