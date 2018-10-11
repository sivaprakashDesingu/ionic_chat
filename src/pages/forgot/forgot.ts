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
  public postData={};
  goBack() {
    this.navCtrl.pop();
  }


  forgotPswdOTP() {
    this.postData = { 'uid': this.uid };
    this.http.post(this.appService.API_ENDPOINT + 'forgotPswdOtp', this.postData)
      .subscribe(data => {
        //console.log(data);
        document.getElementById("otpv").classList.add("open");
      },
      err => console.log(err),
      () => console.log());
  }


  isvalidRstOTP() {
    this.postData = { 'email': this.uid,'otp': this.rotp};
    this.http.post(this.appService.API_ENDPOINT + 'checkValidOTP', this.postData)
      .subscribe(data => {
        this.rsuid = data;
        if (this.rsuid.length > 0) {
            document.getElementById("rst").classList.add("open");
        }else{
          console.log("Invalid OTP...")
        }
        
      },
      err => console.log(err),
      () => console.log());
    /*this.http.get(this.appService.API_ENDPOINT + 'checkValidOTP', {
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
      () => console.log(this.rsuid));*/
  }

  isResetDone() {
    this.http.get(this.appService.API_ENDPOINT + 'isResetfinished', {
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
