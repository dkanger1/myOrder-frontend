import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular/umd';
import { ProdutoDetailPage } from './produto-detail';

@NgModule({
  declarations: [
    ProdutoDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ProdutoDetailPage),
  ],
})
export class ProdutoDetailPageModule {}
