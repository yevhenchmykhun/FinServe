import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements Storage {

  get length(): number {
    return localStorage.length;
  }

  clear(): void {
    localStorage.clear();
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  getObject<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  key(index: number): string | null {
    return localStorage.key(index);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  setObject<T>(key: string, value: T): void {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

}
