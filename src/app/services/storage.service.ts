import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  // Create CRUD methods

  // Create
  addItem(item: ForkliftFormItem): Promise<any> {
    // Specify a the return of a promess to use then block get the item was added
    return this.storage.get(FORKLIFT_KEY)
      .then((formItems: ForkliftFormItem[]) => {
        // Check if exist push it or return set ;
        if (formItems) {
          formItems.push(item);
          return this.storage.set(FORKLIFT_KEY, formItems); // Return array with added form
        } else {
          return this.storage.set(FORKLIFT_KEY, [item]); // Return the same array
        }
      });
  }

  // Read
  getItems(): Promise<ForkliftFormItem[]> {
    return this.storage.get(FORKLIFT_KEY); // Get all values
  }
  // Update
  updateItem(item: ForkliftFormItem): Promise<any> {
    return this.storage.get(FORKLIFT_KEY)
      .then((formItems: ForkliftFormItem[]) => {
        // If items does not exist or length is 0 return null
        if (!formItems || formItems.length === 0) {
          return null;
        }
        const newFormItem: ForkliftFormItem[] = [];

        // Loop througth the array and check if exist the added item
        for (const form of formItems) {
          if (form.id === item.id) {
            newFormItem.push(item); // Push newItem
          } else {
            newFormItem.push(form);
          }
        }
        return this.storage.set(FORKLIFT_KEY, newFormItem);
      });
  }
  // Delete
  deleteItem(id: number): Promise<any> {
    return this.storage.get(FORKLIFT_KEY)
      .then((formItems: ForkliftFormItem[]) => {
        if (!formItems || formItems.length === 0) {
          return null;
        }
        const formsToKeep: ForkliftFormItem[] = [];
        for (const form of formItems) {
          if (form.id !== id) {
            formsToKeep.push(form);
          }
        }
        return this.storage.set(FORKLIFT_KEY, formsToKeep);
      });
  }
}

export interface ForkliftFormItem {
  id: number;
  noEconomico: string;
  marca: string;
  modelo: string;
  serie: string;
  horometro: string;
  largo_pico: string;
  notas: string;
  id_estado: string;
  createdAt: number;
  creator: string;
  photos: IPhoto[];
}

interface IPhoto {
  filepath: string;
  webviewPath: string;
  base64?: string;
  photoId?: string;
}

const FORKLIFT_KEY = 'forkliftFormItems';
