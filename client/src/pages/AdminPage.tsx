import { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import EditIngredients from "../../src/components/admin/EditIngredients";
import EditProducts from "../../src/components/admin/EditProducts";
import Orders from "../../src/components/admin/Orders";

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
            {value === 0 && <EditIngredients />}
            {value === 1 && <EditProducts />}
            {value === 2 && <Orders />}
        </Box>
    )
}

export default AdminPage