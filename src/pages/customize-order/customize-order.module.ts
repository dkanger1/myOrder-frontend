import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomizeOrderPage } from './customize-order';

@NgModule({
  declarations: [
    CustomizeOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomizeOrderPage),
  ],
})
export class CustomizeOrderPageModule {}
