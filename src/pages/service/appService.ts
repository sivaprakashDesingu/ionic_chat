import { Injectable, Component } from '@angular/core';
import { HomePage } from '../home/home';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map'
import { ToastController } from 'ionic-angular';
import { NgModule } from '@angular/core';

@Component({
  providers: [HomePage]
})

@NgModule({
})

@Injectable()
export class AppService {

  constructor(private toastCtrl: ToastController) { }
  public API_ENDPOINT = 'http://localhost:3000/';
  //public  API_ENDPOINT='http://ec2-18-224-82-32.us-east-2.compute.amazonaws.com:3000/';

  presentToast(txt,pos) {
    let toast = this.toastCtrl.create({
      message: txt,
      duration: 3000,
      position: pos
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  
}

