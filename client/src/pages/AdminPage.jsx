import { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import EditIngredients from "../components/EditIngredients";
import EditProducts from "../components/EditProducts";

function AdminPage() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', mt: 8 }}>
            <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Ingredients" />
                <Tab label="Products" />
                <Tab label="Orders" />
            </Tabs>
            {value === 0 && <EditIngredients />}
            {value === 1 && <EditProducts />}
        </Box>
    )
}

export default AdminPage