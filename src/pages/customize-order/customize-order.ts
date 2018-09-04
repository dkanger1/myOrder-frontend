import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-customize-order',
  templateUrl: 'customize-order.html',
})
export class CustomizeOrderPage {
 
  subs = new Subscription();
  imgOrder = "../../assets/imgs/pizza.svg";

  ingredients = [{
    name: "Mussarela",
    src: "../../assets/imgs/cheese.svg"
  }, {
    name: "Salami",
    src: "../../assets/imgs/salami.svg"
  }, {
    name: "Cogumelo",
    src: "../../assets/imgs/mushroom.svg"
  }];

  orderItens: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public dragula: DragulaService, public toastCrtl: ToastController) {
    dragula.createGroup('COPYABLE', {
      copy: (el, source) => {
        return source.id === 'left';
      },
      accepts: (el, target, source, sibling) => {
        return target.id !== 'left';
      }
    });
    this.subs.add(this.dragula.drop("COPYABLE")
      .subscribe(({ el, target, source, sibling }) => {
        this.addClass(el, 'add-ingredient');
        if (target !== null && target.id !== 'left') {
          var id = el.id;
          this.addItemToOrder(id);
        }
      })
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuildOrderPage');
  }

  getIngredient(id: string) {
    return this.ingredients.find(item => item.name === id);
  }

  addItemToOrder(id: string) {
    var item = this.getIngredient(id);

    if (item.name === "Salami") {
      this.imgOrder = "../../assets/imgs/pizza_salami.svg";
    }
    this.orderItens.push(item);
    this.presentToast(id);
  }

  removeItem(item) {
    var index = this.orderItens.indexOf(item, 0);
    console.log(index);
    if (index > -1) {
      this.orderItens.splice(index, 1);
    }

  }

  presentToast(id) {
    var i = this.getIngredient(id);
    const toast = this.toastCrtl.create({
      message: `${i.name} was added successfully`,
      duration: 3000,
      position: "middle"
    });
    toast.present();
  }


  private hasClass(el: Element, name: string): any {
    return new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)').test(el.className);
  }

  private addClass(el: Element, name: string): void {
    if (!this.hasClass(el, name)) {
      el.className = el.className ? [el.className, name].join(' ') : name;
    }
  }

  private removeClass(el: Element, name: string): void {
    if (this.hasClass(el, name)) {
      el.className = el.className.replace(new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)', 'g'), '');
    }
  }

}