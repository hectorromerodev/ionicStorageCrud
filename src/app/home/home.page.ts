import { Component, ViewChild, OnInit } from '@angular/core';
import { StorageService, ForkliftFormItem } from '../services/storage.service';
import { ToastController, Platform, IonList } from '@ionic/angular';
import { formatNumber } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  // form: FormGroup;
  @ViewChild('mylist', { static: false }) mylist: IonList;
  forms: ForkliftFormItem[] = [];
  newItem: ForkliftFormItem = {} as ForkliftFormItem;
  constructor(
    private storageService: StorageService,
    public toastCtrl: ToastController,
    private platform: Platform
  ) {
    // Verify if the platform is ready to use
    this.platform.ready()
      .then(() => {
        this.loadItems();
        console.log(this.forms);
      });
  }
  ngOnInit() {
  }

  loadItems() {
    this.storageService.getItems()
      .then(items => {
        console.log(items);
        this.forms = items;
      });
  }
  // CREATE
  addForm() {
    this.newItem.createdAt = Date.now();
    this.newItem.id = Date.now();
    this.storageService.addItem(this.newItem)
      .then(item => {
        this.newItem = {} as ForkliftFormItem;
        this.showToast('Formulario agregado!');
        this.loadItems(); // Or we can add to the array directly
      });
  }
  // UPDATE
  updateForm(form: ForkliftFormItem) {
    form.creator = `Updated: ${form.creator}`;
    form.createdAt = Date.now();

    this.storageService.updateItem(form)
      .then(item => {
        this.showToast('Formulario actualizado!');
        this.mylist.closeSlidingItems(); // Fix or sliding is stuck afterwards
        this.loadItems(); // Or splice it from the array directrly
      })
  }
  // DELETE
  deleteForm(form: ForkliftFormItem) {
    this.storageService.deleteItem(form.id)
      .then(item => {
        this.showToast('Formulario removido!');
        this.mylist.closeSlidingItems(); // Fix or sliding is stuck afterwards
        this.loadItems(); // Or splice it from the array directrly
      });
  }

  // Helper
  async showToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
