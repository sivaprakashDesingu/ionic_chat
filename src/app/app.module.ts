import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DashPage } from '../pages/dash/dash';
import { ChatBoxPage } from '../pages/chatbox/chatbox';
import { RegisterPage } from '../pages/register/register';
import { ForgotPage } from '../pages/forgot/forgot';


import {AppService} from '../pages/service/appService';
import {HttpClientModule} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DashPage,
    ChatBoxPage,
    RegisterPage,
    ForgotPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DashPage,
    ChatBoxPage,
    RegisterPage,
    ForgotPage
    
  ],
  providers: [
    StatusBar,
    AppService,
    SplashScreen,
    CookieService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
