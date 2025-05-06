import axios from "axios";

class AdminService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_DEV_SERVER_URL || process.env.REACT_APP_SERVER_URL,
    });

    // Automatically set JWT token on the request headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = {
          ...config.headers, // Preserve existing headers
          Authorization: `Bearer ${storedToken}`
        };
      }

      return config;
    });
  }

  async getIngredients() {
    const response = await this.api.get(`/admin/ingredients`);
    return response.data.ingredients
  }

  async updateProduct(updatedProduct) {
    const response = await this.api.put(`/admin/product`, updatedProduct);
    return response.data.product
  }

  async updateIngredient(updatedIngredient) {
    const response = await this.api.put(`/admin/ingredient`, updatedIngredient);
    return response.data.ingredient
  }

  async getOrders() {
    const response = await this.api.get(`/admin/orders`);
    return response.data.orders
  }
}

// Create one instance (object) of the service
const adminService = new AdminService();

export default adminService;