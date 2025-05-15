import { useState, useEffect } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import ManageIngredients from "../components/admin/ManageIngredients";
import ManageProducts from "../components/admin/ManageProducts";
import ManageOrders from "../components/admin/ManageOrders";
import adminService from '../services/admin.service'
import appService from "../services/app.service";
import { useStore } from "../store";

function AdminPage() {
    const { setIngredients, setProducts, setOrders } = useStore()
    const [value, setValue] = useState(1);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        try {
            const ingredients = await adminService.getIngredients()
            setIngredients(ingredients)
            const prodcts = await appService.getProducts();
            setProducts(prodcts);
            const orders = await adminService.getOrders();
            setOrders(orders);
        } catch (error) {
            alert(`Error fetching data: ${error}`)
        }
    }

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