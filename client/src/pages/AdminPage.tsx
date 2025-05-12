import { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import ManageIngredients from "../components/admin/ManageIngredients";
import ManageProducts from "../components/admin/ManageProducts";
import ManageOrders from "../components/admin/ManageOrders";

function AdminPage() {
    const [value, setValue] = useState(1);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', mt: 8 }}>
            <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Ingredients" />
                <Tab label="Products" />
                <Tab label="Orders" />
            </Tabs>
            {value === 0 && <ManageIngredients />}
            {value === 1 && <ManageProducts />}
            {value === 2 && <ManageOrders />}
        </Box>
    )
}

export default AdminPage