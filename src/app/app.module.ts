import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CategoriaService } from '../services/domain/categoria.service';
import { ErrorInterceptorProvider } from '../interceptor/error-interceptor';
import { ProdutoService } from '../services/domain/produto.service';
import { HttpModule } from '@angular/http';
import { CartService } from '../services/domain/cart.service';
import { StorageService } from '../services/storage.service';
import { DragulaModule } from 'ng2-dragula';
import { CustomizeOrderPage } from '../pages/customize-order/customize-order';

@NgModule({
  declarations: [
    MyApp,
    CustomizeOrderPage
    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    DragulaModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CustomizeOrderPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoriaService,
    ErrorInterceptorProvider,
    ProdutoService,
    StorageService,
    CartService
  ]
})
export class AppModule {}
