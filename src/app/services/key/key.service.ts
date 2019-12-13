import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KeyService {
  // This just simulates hitting a backend API to get a key
  get(): Promise<string> {
    return new Promise(resolve => setTimeout(() => resolve('25cd7db1-d6ab-43b6-87eb-b75dc022698c'), 1000));
  }
}
