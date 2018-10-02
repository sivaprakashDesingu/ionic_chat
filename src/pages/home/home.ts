import { Component, OnInit } from '@angular/core';
import { NavController,ToastController  } from 'ionic-angular';

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
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {


  // constructor(public navCtrl: NavController) {

  // }

  private ulst;
  private uid;
  private upswd;

  constructor(private appService: AppService, public navCtrl: NavController, private http: HttpClient, private cookie: CookieService) { }
  
  
  
  getUser() {
    this.http.get(this.appService.API_ENDPOINT + 'isValiduser', {
      params: {
        uid: this.uid
      }
    })
      .subscribe(data => {
        this.ulst = data;
        for (var i = 0; i < this.ulst.length; i++) {
          if (this.upswd == this.ulst[i].pswd && this.uid == this.ulst[i].uid) {
            this.cookie.set('luser', this.uid);
            this.cookie.set('luname', this.ulst[i].uname);
            this.navCtrl.push(DashPage);
            //this.push.navigate(['/dash']);
          } else {
              this.appService.presentToast("Please give me a Valid input",'bottom');
          }
        }
        if(this.ulst.length==0){
          this.appService.presentToast("Please give me a Valid input",'bottom');
        }
      },
      err => console.log(err),
      () => console.log());
  }
  isLoggedIn() {
    this.getUser();
   // this.navCtrl.push(DashPage);


  }
  nextPage(pageName){
    if(pageName=="fp")
      this.navCtrl.push(ForgotPage);
    else
      this.navCtrl.push(RegisterPage);

  }
  ngOnInit() {


  }

}
