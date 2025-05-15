import axios, { type AxiosInstance } from "axios";
import type { Ingredient, Product, Order } from "../types";

class AdminService {
  api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_DEV_SERVER_URL || import.meta.env.VITE_SERVER_URL,
    });
  }

  async getIngredients(): Promise<Ingredient[]> {
    const response = await this.api.get(`/admin/ingredients`);
    return response.data.ingredients
  }

  async createProduct(): Promise<Product> {
    const response = await this.api.post(`/admin/product`);
    return response.data.product
  }

  async updateProduct(updatedProduct: Product): Promise<Product> {
    const response = await this.api.put(`/admin/product`, updatedProduct);
    return response.data.product
  }

  async createIngredient(): Promise<Ingredient> {
    const response = await this.api.post(`/admin/ingredient`);
    return response.data.ingredient
  }

  async updateIngredient(updatedIngredient: Ingredient): Promise<Ingredient> {
    const response = await this.api.put(`/admin/ingredient`, updatedIngredient);
    return response.data.ingredient
  }

  async getOrders(): Promise<Order[]> {
    const response = await this.api.get(`/admin/orders`);
    return response.data.orders
  }

  async createOrder(): Promise<Order> {
    const response = await this.api.post(`/admin/orders`);
    return response.data.order
  }

  async updateOrder(updatedOrder: Order): Promise<Order> {
    const response = await this.api.put(`/admin/orders`, updatedOrder);
    return response.data.order
  }
}

// Create one instance (object) of the service
const adminService = new AdminService();

export default adminService;