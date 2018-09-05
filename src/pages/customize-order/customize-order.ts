import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import { Ingredients } from '../../models/ingredients';

@IonicPage()
@Component({
  selector: 'page-customize-order',
  templateUrl: 'customize-order.html',
})
export class CustomizeOrderPage {

  public subs = new Subscription();
  public IMG_DEFAULT: string = "../../assets/imgs/pizza.svg";
  public imgOrder: string;

  public ingredients = [{
    id: "cheese",
    src: "../../assets/imgs/cheese.svg",
    name: "Mussarela"
  }, {
    id: "calabresa",
    src: "../../assets/imgs/salami.svg",
    name: "Calabresa",
  }, {
    id: "mushroom",
    src: "../../assets/imgs/mushroom.svg",
    name: "Cogumelo",
  }];

  orderItens: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public dragula: DragulaService, public toastCrtl: ToastController) {
    this.imgOrder = this.IMG_DEFAULT;
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
    return this.ingredients.find(item => item.id === id);
  }

  addItemToOrder(id: string) {
    var item = this.getIngredient(id);


    this.orderItens.push(item);
    this.presentToast(id);
    this.refreshOrder();
  }

  removeItem(item) {
    var index = this.orderItens.indexOf(item, 0);
    console.log(index);
    if (index > -1) {
      this.orderItens.splice(index, 1);
    }
    this.refreshOrder();
  }

  refreshOrder() {
    try {
      var hasCheese: boolean = this.orderItens.find(i => i.id === "cheese") != null;
      console.log(hasCheese);
      var hasCalabresa = this.orderItens.find(i => i.id === "calabresa") != null;
      console.log(hasCalabresa);
      var hasMushroom: boolean = this.orderItens.find(i => i.id === "mushroom") != null;
      console.log(hasMushroom);

      console.log("------------", JSON.stringify(this.orderItens, null, " "));
    } catch (error) {
      console.error(error);
    }

    if (hasCheese) {
      console.log("ADD IMAGE QUEIJO");
      // this.imgOrder = "../../assets/imgs/pizza_salami.svg";
    } else {
      // this.imgOrder = this.IMG_DEFAULT;
    }
    if (hasCalabresa) {
      this.imgOrder = "../../assets/imgs/pizza_salami.svg";
    } else {
      this.imgOrder = this.IMG_DEFAULT;
    }
    if (hasMushroom) {
      console.log("ADD IMAGE COGUMELO");
      // this.imgOrder = "../../assets/imgs/pizza_salami.svg";
    } else {
      // this.imgOrder = this.IMG_DEFAULT;
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