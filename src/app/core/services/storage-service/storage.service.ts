import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  storage = localStorage;

  constructor() { }

  setData(key: string, data: any) {
    try {
      this.storage.removeItem(key);
      this.storage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to local storage', e);
    }
  }

  // Get data from local storage
  getData(key: string) {
    const data = this.storage.getItem(key);
    if (data === null) {
      return null;
    }
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('Error parsing data from local storage', e);
      return null;
    }
  }

  // Remove data from local storage
  removeData(key: string) {
    try {
      this.storage.removeItem(key);
    } catch (e) {
      console.error('Error removing data from local storage', e);
    }
  }

  clearData(): void {
    this.storage.clear()
  }
}
