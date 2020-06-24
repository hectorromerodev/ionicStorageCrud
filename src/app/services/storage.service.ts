import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }
}

export interface ForkliftFormItem {
  id: string;
  noEconomico: string;
  marca: string;
  modelo: string;
  serie: string;
  horometro: string;
  largo_pico: string;
  notas: string;
  id_estado: string;
  createdAt: string;
  creator: string;
  photos: IPhoto[];
}

interface IPhoto {
  filepath: string;
  webviewPath: string;
  base64?: string;
  photoId?: string;
}
