import axios from "axios";

class AppService {
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

  async getProducts() {
    const response = await this.api.get(`/api/products`);
    return response.data.products
  }

  async getProduct(productId) {
    const response = await this.api.get(`/api/product/${productId}`);
    return response.data.product
  }

  async placeOrder(requestBody) {
    const response = await this.api.post(`/api/checkout`, requestBody);
    return response.data
  }

  async getIngredients() {
    const response = await this.api.get(`/api/ingredients`);
    return response.data.ingredients
  }

  async updateProduct(updatedProduct) {
    const response = await this.api.put(`/api/product`, updatedProduct);
    return response.data.product
  }

}

// Create one instance (object) of the service
const appService = new AppService();

export default appService;