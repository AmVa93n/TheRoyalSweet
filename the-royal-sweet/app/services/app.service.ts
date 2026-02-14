import type { Product, Order } from "../types";

const appService = {
  async getProducts(): Promise<Product[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    return response.json();
  },

  async getProductById(productId: string): Promise<Product> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.statusText}`);
    }
    return response.json();
  },

  async getCakeComponents() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cake-components`);
    if (!response.ok) {
      throw new Error(`Failed to fetch cake components: ${response.statusText}`);
    }
    return response.json();
  },

  async createPayment(order: Partial<Order>) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    if (!response.ok) {
      throw new Error(`Failed to create payment: ${response.statusText}`);
    }
    return response.json();
  },

  async createOrder(order: Partial<Order>) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    if (!response.ok) {
      throw new Error(`Failed to create order: ${response.statusText}`);
    }
    return response.json();
  }
}

export default appService;