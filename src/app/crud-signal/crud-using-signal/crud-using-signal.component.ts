import { Component, inject, OnInit, signal } from '@angular/core';
import { CrudService } from './crud.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crud-using-signal',
  templateUrl: './crud-using-signal.component.html',
  styleUrls: ['./crud-using-signal.component.css'],
  imports: [NgIf, NgFor, FormsModule],
})
export class CrudUsingSignalComponent {
  private apiService = inject(CrudService);

  // Signals for state management
  items = signal<any[]>([]);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  isEditing = false;
  editingItem: any = null;

  constructor() {}

  ngOnInit() {
    this.loadItems();
  }

  // Fetch all items
  async loadItems() {
    this.isLoading.set(true);
    try {
      const data = await this.apiService.getItems();
      this.items.set(data);
      this.error.set(null);
    } catch (err) {
      this.error.set('Failed to load items');
    } finally {
      this.isLoading.set(false);
    }
  }

  // Add new item
  async addItem(newItem: any) {
    this.isLoading.set(true);
    try {
      const createdItem = await this.apiService.createItem(newItem);
      this.items.set([...this.items(), createdItem]);
      this.error.set(null);
    } catch (err) {
      this.error.set('Failed to add item');
    } finally {
      this.isLoading.set(false);
    }
  }

  // Start editing an item
  editItem(item: any) {
    this.isEditing = true;
    this.editingItem = { ...item }; // Clone to avoid mutation
  }

  // Update an item
  async updateItem(id: string, updatedItem: any) {
    this.isLoading.set(true);
    try {
      const updatedData = await this.apiService.updateItem(id, updatedItem);
      this.items.set(
        this.items().map((item) => (item.id === id ? updatedData : item))
      );
      this.error.set(null);
      this.isEditing = false;
    } catch (err) {
      this.error.set('Failed to update item');
    } finally {
      this.isLoading.set(false);
    }
  }

  // Delete an item
  async deleteItem(id: string) {
    this.isLoading.set(true);
    try {
      await this.apiService.deleteItem(id);
      this.items.set(this.items().filter((item) => item.id !== id));
      this.error.set(null);
    } catch (err) {
      this.error.set('Failed to delete item');
    } finally {
      this.isLoading.set(false);
    }
  }

  // Track by function to optimize the list rendering
  trackById(index: number, item: any) {
    return item.id;
  }
}
