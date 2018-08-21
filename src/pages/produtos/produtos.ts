import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';


@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public cartService: CartService
   ) {
  }

  ionViewDidLoad() {
    let categoria_id = this.navParams.get('categoria_id');
    this.produtoService.findByCategoria(categoria_id)
    .subscribe(response => {
      this.items = response['content'];
      this.loadImageUrls();
    },
  error=>{})
  }
loadImageUrls(){
  for(var i=0; i<this.items.length; i++){
    let item = this.items[i];
    this.produtoService.getSmallImageFromBucket(item.id)
    .subscribe(response => {
      item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;

    },
  error =>{})
  }
}

addToCart(produto: ProdutoDTO)
{
this.cartService.addProduto(produto);
this.navCtrl.setRoot("CartPage");
}
}
