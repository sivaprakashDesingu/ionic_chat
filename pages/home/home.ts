import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { URLSearchParams } from '@angular/http';
//import { Router } from "@angular/router";

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from '../service/appService';
import { DashPage } from '../dash/dash';
import { RegisterPage } from '../register/register';
import { ForgotPage } from '../forgot/forgot';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit {


  // constructor(public navCtrl: NavController) {

  // }

  private ulst;
  private uid;
  private upswd;
  private postData = {};

  constructor(private appService: AppService, public navCtrl: NavController, private http: HttpClient, private cookie: CookieService) {
    console.log(this.cookie.get('luser').length);
if(this.cookie.get('luser').length !=0){
       this.navCtrl.push(DashPage);
    }

   }

  getUser() {
    this.postData = { 'uid': this.uid };
    this.http.post(this.appService.API_ENDPOINT + 'isValiduser', this.postData)
      .subscribe(data => {
        this.ulst = data;
        console.log(this.ulst);
        for (var i = 0; i < this.ulst.length; i++) {
          if (this.upswd == this.ulst[i].pswd && this.uid == this.ulst[i].uid && this.ulst[i].isActiveted=="True") {
            this.cookie.set('luser', this.uid);
            this.cookie.set('luname', this.ulst[i].uname);
            this.navCtrl.push(DashPage);
            //this.push.navigate(['/dash']);
          } else if (this.upswd == this.ulst[i].pswd && this.uid == this.ulst[i].uid && this.ulst[i].isActiveted=="False") {
            this.appService.presentToast("Please Kindly Verify your Account by the OTP value which will be sent to your registerd email address while registration.", 'top',3000);
          }
          else {
            this.appService.presentToast("Please give me a Valid input", 'bottom',3000);
          }
        }
        if (this.ulst.length == 0) {
          this.appService.presentToast("Please give me a Valid input", 'bottom',3000);
        }
      },
      err => console.log(err),
      () => console.log());
  }
  isLoggedIn() {
    this.getUser();
    // this.navCtrl.push(DashPage);
  }
  nextPage(pageName) {
    if (pageName == "fp"){
      this.navCtrl.push(ForgotPage,{
         pageEnable:pageName
      });
    }
    else if(pageName == "rp" || pageName == "vac"){
      this.navCtrl.push(RegisterPage,{
        pageEnable:pageName
      });
    }
  }

  ngOnInit() {
    //console.log(this.cookie.get('luser'));
    

  }

}
