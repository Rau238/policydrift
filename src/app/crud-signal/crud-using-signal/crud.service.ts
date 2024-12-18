import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  private baseUrl = 'http://localhost:3000/items'; // JSON Server URL

  // Create item
  async createItem(data: any): Promise<any> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  }

  // Get all items
  async getItems(): Promise<any[]> {
    const response = await fetch(this.baseUrl);
    return response.json();
  }

  // Get item by ID
  async getItemById(id: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    return response.json();
  }

  // Update item
  async updateItem(id: string, data: any): Promise<any> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.json();
  }

  // Delete item
  async deleteItem(id: string): Promise<void> {
    await fetch(`${this.baseUrl}/${id}`, { method: 'DELETE' });
  }
}
