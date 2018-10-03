import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AppService } from '../service/appService';
/**
 * Generated class for the ForgotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html',
})
export class ForgotPage {

  private uid;
  private fienb = false;
  private rotp;
  private rsuid;
  private rpswd;

  goBack() {
    this.navCtrl.pop();
  }


  forgotPswdOTP() {
    this.http.get(this.appService.API_ENDPOINT + 'forgotPswdOtp.php', {
      params: {
        uid: this.uid
      }
    })
      .subscribe(data => {
        if (data == "True")
          document.getElementById("otpv").classList.add("open")
      },
      err => console.log(err),
      () => console.log());
  }


  isvalidRstOTP() {
    this.http.get(this.appService.API_ENDPOINT + 'checkValidOTP.php', {
      params: {
        otp: this.rotp
      }
    })
      .subscribe(data => {
        this.rsuid = data;
        if (this.rsuid.length > 0) {
          //this.fienb = true;
          document.getElementById("rst").classList.add("open");
        }
      },
      err => console.log(err),
      () => console.log(this.rsuid));
  }

  isResetDone() {
    this.http.get(this.appService.API_ENDPOINT + 'isResetfinished.php', {
      params: {
        uid: this.rsuid[0].uid, pswd: this.rpswd
      }
    })
      .subscribe(data => {
        console.log(data);
        if (data == "True") {
          this.fienb = true;
        }

      },
      err => console.log(err),
      () => console.log());
  }

  constructor(private appService: AppService, public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPage');
  }

}
