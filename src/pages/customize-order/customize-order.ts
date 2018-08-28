import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { CartService } from '../../services/domain/cart.service';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';

/**
 * Generated class for the CustomizeOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customize-order',
  templateUrl: 'customize-order.html',
})
export class CustomizeOrderPage {
 
  item: ProdutoDTO;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public cartService: CartService) {
  }
  ionViewDidLoad() {
    let produto_id = this.navParams.get('produto_id');
    this.produtoService.findById(produto_id)
      .subscribe(response => {
        this.item = response;
        this.getImageUrlIfExists();
      },
      error => {});
  }

  getImageUrlIfExists() {
    this.produtoService.getImageFromBucket(this.item.id)
      .subscribe(response => {      
        this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`;
      },
      error => {});
  }

  addToCart(produto: ProdutoDTO) {
    this.cartService.addProduto(produto);
    this.navCtrl.setRoot('CartPage');
  }
}