import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from '../../../node_modules/ionic-angular/navigation/ionic-page';
import { CategoriasPage } from '../categorias/categorias';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
login() {
  this.navCtrl.setRoot('CategoriasPage');
}
}
