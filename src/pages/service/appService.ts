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

  // presentToast(txt,pos) {
  //   let toast = this.toastCtrl.create({
  //     message: txt,
  //     duration: 5000,
  //     position: pos
  //   });

  //   toast.onDidDismiss(() => {
  //     console.log('Dismissed toast');
  //   });

  //   toast.present();
  // }
  presentToast(txt,pos,dur) {
    let toast = this.toastCtrl.create({
      message: txt,
      duration: dur,
      position: dur
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast with duration ');
    });

    toast.present();
  }

   currentDate() {
    var d = new Date(),
      sec = d.getSeconds().toString().length == 1 ? '0' + d.getSeconds() : d.getSeconds(),
      minutes = d.getMinutes().toString().length == 1 ? '0' + d.getMinutes() : d.getMinutes(),
      hours = d.getHours().toString().length == 1 ? '0' + d.getHours() : d.getHours(),
      //ampm = d.getHours() >= 12 ? 'pm' : 'am',
      months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    //days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    return months[d.getMonth()] + ' ' + d.getDate() + ' ' + d.getFullYear() + ' ' + hours + ':' + minutes + ':' + sec;
  }

  
}

