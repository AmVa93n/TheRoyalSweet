import { TextField, Button, Dialog, DialogContent, DialogActions } from "@mui/material";
import { useState } from "react";
import type { Ingredient } from "../../types";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { useStore } from "../../store";
import adminService from '../../services/admin.service'

type Props = {
    open: boolean;
    ingredient?: Ingredient;
    onClose: () => void;
};

export default function EditIngredient({ open, ingredient, onClose }: Props) {
    const { ingredients, setIngredients } = useStore();
    const [ingredientForm, setIngredientForm] = useState(ingredient as Ingredient);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setIngredientForm(prev => ({ ...prev, [name]: value }));
    };

    async function handleSave() {
        try {
            const updatedIngredient = await adminService.updateIngredient(ingredientForm);
            const updatedIngredients = ingredients.map(ingredient => ingredient._id === updatedIngredient._id ? updatedIngredient : ingredient);
            setIngredients(updatedIngredients); // Update the ingredient in the list
        } catch (error) {
            console.error("Error saving ingredient:", error);
        }
        onClose();
    };

    return (
        <Dialog open={open} fullWidth maxWidth="lg">
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                
                <TextField name="name" label="Name" value={ingredientForm.name} onChange={handleChange} size="small" />
                <TextField name="supermarket" label="Supermarket" value={ingredientForm.supermarket} onChange={handleChange} size="small" />
                <TextField name="brand" label="Brand" value={ingredientForm.brand} onChange={handleChange} size="small"/>
                <TextField name="recipeUnits" label="Recipe Units" value={ingredientForm.recipeUnits} onChange={handleChange} size="small" />
                <TextField name="pricePerUnit" label="Price / Unit" value={ingredientForm.pricePerUnit} onChange={handleChange} type="number" size="small" />
                <TextField name="price" label="Price" value={ingredientForm.price} onChange={handleChange} type="number" size="small"/>
                <TextField name="unitsPerPackage" label="Units / Package" value={ingredientForm.unitsPerPackage} onChange={handleChange} type="number" size="small" />
                <TextField name="packageUnits" label="Package Units" value={ingredientForm.packageUnits} onChange={handleChange} size="small"/>

            </DialogContent>
            <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={handleSave} startIcon={<DoneIcon />} color="success" variant="contained">
                    Save Changes
                </Button>
                <Button onClick={onClose} startIcon={<CloseIcon />} color="error" variant="outlined">
                    Discard
                </Button>
            </DialogActions>
        </Dialog>
    )
}