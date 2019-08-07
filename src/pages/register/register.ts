import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AppService } from '../service/appService';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

   private uid;
  private upswd;
  private fullna;
  private ueid;
  private rmid;
  private resnt = false;
  private rotp;
  //private Indata = {'uid': this.uid, 'fname': this.fullna,'email':this.ueid,'pswd':this.upswd};
  private Indata = {};



  constructor(private appService: AppService,private http: HttpClient,public navCtrl: NavController, public navParams: NavParams) {
  
    console.log(this.navParams.get("pageEnable"));
    if((this.navParams.get("pageEnable"))=="vac"){
      //document.getElementById("otpopen").classList.add("open");
    }
  }

  isUserRegisterSubmitted() {

    this.Indata = { 'uid': this.uid, 'fname': this.fullna, 'email': this.ueid, 'pswd': this.upswd };

    this.http.post(this.appService.API_ENDPOINT +'isUserRegisterSubmitted', this.Indata)
      .subscribe(data => {
        if (data == 1) {
          console.log(data);
          document.getElementById("otpopen").classList.add("open");
        } else if (data == 'ER_DUP_ENTRY') {
          console.log("else" + data);
        }
      },
        err => console.log(err),
        () => console.log());
  }

  reGenerateOTP() {
    this.Indata = { 'rgotp': this.rmid };
    this.http.post(this.appService.API_ENDPOINT +'reGenerateOTP', this.Indata)
      .subscribe(data => {
        console.log(data);
        if (data == 1) {
          this.resnt = true;
        }
        else {
          this.resnt = false;
        }
      },
        err => console.log(err),
        () => console.log());

  }
  isOTPVerified() {
    this.Indata = { 'rotp': this.rotp };
    this.http.post(this.appService.API_ENDPOINT +'isOTPVerified', this.Indata)
      .subscribe(data => {
        console.log(data)
        if (data == 1) {
          document.getElementById("otpst").classList.add("open")
        } else {
          // this.snackBar.open("Invalid OTP...", "", {
          //   duration: 1000,
          //   panelClass: ['snackbar']
          // });
          console.log("else" + data);
        }

      },
        err => console.log(err),
        () => console.log());
  }

  goBack(){
    this.navCtrl.pop();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
     if((this.navParams.get("pageEnable"))=="vac"){
      document.getElementById("otpopen").classList.add("open");
    }
  }

}
