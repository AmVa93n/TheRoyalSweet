import { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import EditIngredients from "../components/EditIngredients";
import EditProducts from "../components/EditProducts";
import Orders from "../components/Orders";

function AdminPage() {
    const [value, setValue] = useState(1);

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
            {value === 2 && <Orders />}
        </Box>
    )
}

export default AdminPage