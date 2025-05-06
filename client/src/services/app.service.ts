import axios, { type AxiosInstance } from "axios";
import type { Product, Order } from "../types";

class AppService {
  api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_DEV_SERVER_URL || import.meta.env.VITE_SERVER_URL,
    });
  }

  async getProducts(): Promise<Product[]> {
    const response = await this.api.get(`/api/products`);
    return response.data.products
  }

  async getProduct(productId: string): Promise<Product> {
    const response = await this.api.get(`/api/product/${productId}`);
    return response.data.product
  }

  async placeOrder(requestBody: Order): Promise<Order> {
    const response = await this.api.post(`/api/checkout`, requestBody);
    return response.data
  }
}

// Create one instance (object) of the service
const appService = new AppService();

export default appService;