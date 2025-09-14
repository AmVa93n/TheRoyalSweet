import axios, { type AxiosInstance } from "axios";
import type { Ingredient, Product, Order, CakeComponent } from "../types";

class AdminService {
  api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_DEV_SERVER_URL || import.meta.env.VITE_SERVER_URL,
    });
  }

  async createProduct(): Promise<Product> {
    const response = await this.api.post(`/admin/products`);
    return response.data.product
  }

  async updateProduct(updatedProduct: Product): Promise<Product> {
    const response = await this.api.put(`/admin/products`, updatedProduct);
    return response.data.product
  }

  async deleteProduct(productId: string): Promise<void> {
    await this.api.delete(`/admin/products/${productId}`);
  }

  async getIngredients(): Promise<Ingredient[]> {
    const response = await this.api.get(`/admin/ingredients`);
    return response.data.ingredients
  }

  async createIngredient(): Promise<Ingredient> {
    const response = await this.api.post(`/admin/ingredients`);
    return response.data.ingredient
  }

  async updateIngredient(updatedIngredient: Ingredient): Promise<Ingredient> {
    const response = await this.api.put(`/admin/ingredients`, updatedIngredient);
    return response.data.ingredient
  }

  async deleteIngredient(ingredientId: string): Promise<void> {
    await this.api.delete(`/admin/ingredients/${ingredientId}`);
  }

  async getCakeComponents(): Promise<CakeComponent[]> {
    const response = await this.api.get(`/admin/cakeComponents`);
    return response.data.cakeComponents
  }

  async createCakeComponent(): Promise<CakeComponent> {
    const response = await this.api.post(`/admin/cakeComponents`);
    return response.data.cakeComponent
  }

  async updateCakeComponent(updatedCakeComponent: CakeComponent): Promise<CakeComponent> {
    const response = await this.api.put(`/admin/cakeComponents`, updatedCakeComponent);
    return response.data.cakeComponent
  }

  async deleteCakeComponent(cakeComponentId: string): Promise<void> {
    await this.api.delete(`/admin/cakeComponents/${cakeComponentId}`);
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

  async deleteOrder(orderId: string): Promise<void> {
    await this.api.delete(`/admin/orders/${orderId}`);
  }
}

// Create one instance (object) of the service
const adminService = new AdminService();

export default adminService;