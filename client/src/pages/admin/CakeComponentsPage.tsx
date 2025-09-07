import { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Select, MenuItem, Box, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import adminService from '../../services/admin.service'
import type { CakeComponent } from "../../types";
import { calculatePrice } from "../../utils";
import EditCakeComponentModal from "../../components/admin/EditCakeComponentModal";
import { useStore } from "../../store";
import AscIcon from '@mui/icons-material/ArrowUpward';
import DescIcon from '@mui/icons-material/ArrowDownward';

function CakeComponentsPage() {
  const { cakeComponents, setCakeComponents, sortPreferences, setSortPreferences } = useStore();
  const { criteria: sortCriteria, direction: sortDirection } = sortPreferences.cakeComponents;
  const [editedCakeComponent, setEditedCakeComponent] = useState<CakeComponent | null>(null);

  async function handleSave(cakeComponentForm: CakeComponent) {
    const updatedCakeComponent = await adminService.updateCakeComponent(cakeComponentForm);
    const updatedCakeComponents = cakeComponents.map((cakeComponent) => cakeComponent._id === updatedCakeComponent._id ? updatedCakeComponent : cakeComponent);
    setCakeComponents(updatedCakeComponents);
    setEditedCakeComponent(null); // Stop editing mode
  };

  async function handleAddCakeComponent() {
    const newCakeComponent = await adminService.createCakeComponent();
    const updatedCakeComponents = [...cakeComponents, newCakeComponent];
    setCakeComponents(updatedCakeComponents); // Add the new cake component to the list
  };

  function sortFunction(a: CakeComponent, b: CakeComponent) {
    switch (sortCriteria) {
      case 'name':
        return sortDirection === 'asc' ? a.name.pt.localeCompare(b.name.pt) : b.name.pt.localeCompare(a.name.pt);
      case 'category':
        return sortDirection === 'asc' ? a.category.localeCompare(b.category) : b.category.localeCompare(a.category);
      case 'workHours':
      case 'electricityHours':
        return sortDirection === 'asc' ? a[sortCriteria] - b[sortCriteria] : b[sortCriteria] - a[sortCriteria];
      case 'price':
      case 'totalCost':
      case 'netGain':
        return sortDirection === 'asc' ? calculatePrice(a)[sortCriteria] - calculatePrice(b)[sortCriteria] : calculatePrice(b)[sortCriteria] - calculatePrice(a)[sortCriteria];
      default:
        return 0;
    }
  }

  return (
    <div className="pt-20 pb-10 min-h-screen">
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
        <Typography variant="body1" sx={{ marginRight: 2 }}>Sort by:</Typography>

        <Select
          value={sortCriteria}
          onChange={(e) => setSortPreferences('products', { criteria: e.target.value, direction: sortDirection })}
          size="small"
        >
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="category">Category</MenuItem>
          <MenuItem value="workHours">Work Hours</MenuItem>
          <MenuItem value="electricityHours">Electricity Hours</MenuItem>
          <MenuItem value="price">Price</MenuItem>
          <MenuItem value="totalCost">Total Cost</MenuItem>
          <MenuItem value="netGain">Net Gain</MenuItem>
        </Select>
        
        <IconButton onClick={() => setSortPreferences('products', { criteria: sortCriteria, direction: 'desc' })}>
          <DescIcon color={sortDirection === 'desc' ? 'primary' : 'inherit'} />
        </IconButton>

        <IconButton onClick={() => setSortPreferences('products', { criteria: sortCriteria, direction: 'asc' })}>
          <AscIcon color={sortDirection === 'asc' ? 'primary' : 'inherit'} />
        </IconButton>
      </Box>

      <TableContainer component={Paper} sx={{width: '92%', mx: 'auto'}}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{fontWeight: 'bold'}} padding="normal">Name</TableCell>
              <TableCell sx={{fontWeight: 'bold'}} padding="normal">Category</TableCell>
              <TableCell sx={{fontWeight: 'bold'}} padding="normal">Work Hours</TableCell>
              <TableCell sx={{fontWeight: 'bold'}} padding="normal">Electricity Hours</TableCell>
              <TableCell sx={{fontWeight: 'bold'}} padding="normal">Price</TableCell>
              <TableCell sx={{fontWeight: 'bold'}} padding="normal">Total Cost</TableCell>
              <TableCell sx={{fontWeight: 'bold'}} padding="normal">Net Gain</TableCell>
              <TableCell sx={{fontWeight: 'bold'}} padding="normal">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cakeComponents.sort(sortFunction).map((cakeComponent) => (
              <TableRow key={cakeComponent._id}>

                <TableCell padding="normal">{cakeComponent.name.pt}</TableCell>
                <TableCell padding="normal">{cakeComponent.category}</TableCell>
                <TableCell padding="normal">{cakeComponent.workHours}</TableCell>
                <TableCell padding="normal">{cakeComponent.electricityHours}</TableCell>
                <TableCell padding="normal">{calculatePrice(cakeComponent).price.toFixed(2)} €</TableCell>
                <TableCell padding="normal">{calculatePrice(cakeComponent).totalCost.toFixed(2)} €</TableCell>
                <TableCell padding="normal">{calculatePrice(cakeComponent).netGain.toFixed(2)} €</TableCell>

                <TableCell padding="normal">
                  <IconButton onClick={() => setEditedCakeComponent(cakeComponent)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button variant="contained" onClick={handleAddCakeComponent} sx={{ position: 'fixed', bottom: 20, right: 20 }}>
          Create Cake Component
      </Button>

      {editedCakeComponent && <EditCakeComponentModal
        open={!!editedCakeComponent}
        cakeComponent={editedCakeComponent}
        onSave={handleSave}
        onClose={() => setEditedCakeComponent(null)}
      />}
    </div>
  );
};

export default CakeComponentsPage;