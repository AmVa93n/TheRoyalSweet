import type { Order } from "./types";

const appService = {
  async createPayment(order: Partial<Order>) {
    const response = await fetch(`/api/checkout`, {
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
    const response = await fetch(`/api/orders`, {
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