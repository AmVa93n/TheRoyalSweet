import axios from "axios";

class AppService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_DEV_SERVER_URL || import.meta.env.VITE_SERVER_URL,
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
}

// Create one instance (object) of the service
const appService = new AppService();

export default appService;