import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../service/appService';
import { ChatBoxPage } from '../chatbox/chatbox';
import * as $ from 'jquery';
//import { DashPage } from '../dash/dash';
/**
 * Generated class for the DashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dash',
  templateUrl: 'dash.html',
})
export class DashPage implements OnInit {

  private lgid;
  private lguser;
  private lupic;
  private userchats;
  private srfr;     //variable for global search
  private srfrlst;
  private usfrlt;
  isSearchVisible: boolean;
  isUserProvileEnabled: boolean;
  isProSett: boolean;
  isProFfSett: boolean;
  isProFfPenSett: boolean;

  /* user profile variable */
  private uemail;
  private uloc;
  private status;
  private phn;
  private upro_path;
  private ucover_path;

  isMoreOpen: boolean;
  private grouOrPrivate="private";


  private postData = {};
  private gropChatSelectedid = ['bub1'];
  private gropChatSelectedper = [];
  constructor(public navParams: NavParams, public navCtrl: NavController, private appService: AppService, private cookie: CookieService, private http: HttpClient) {
    this.isProSett = true;
  }

  isMoreOpened() {
    this.isMoreOpen = true;
  }
  isMoreClosed() {
    this.isMoreOpen = false;
  }
  enableSearchFun(srac) {
   
    this.isSearchVisible = true;
    document.getElementById("pghd").classList.add("hideHeader");
    if (srac == "chat" || srac == "grp") {
      this.grouOrPrivate=srac;
      console.log('open'+this.grouOrPrivate);
      this.listFriendsAndRequest();
      $("#chatsr").attr("data-show","true");
      $("#peppleSearch").attr("data-show","false");
    } else if (srac == "ppl") {
      $("#chatsr").attr("data-show","false");
      $("#peppleSearch").attr("data-show","true");     
    }

  }
  closeSearchFun() {
    this.isSearchVisible = false;
    $("#chatsr").removeAttr("data-show");
    $("#peppleSearch").removeAttr("data-show",);
    document.getElementById("pghd").classList.remove("hideHeader");
  }
  addrmclass(adc, rmc, whrm, st) {
    document.getElementById(adc).classList.add('show');
    document.getElementById(rmc).classList.remove('show');
    if (st == "yes")
      $("#" + whrm).attr("data-overlay", "off");
    else
      $("#" + whrm).attr("data-overlay", "on");
  }

  CancelUpdateDataOfUser(uAttr, adc, rmc, id, st) {
    this.enableUProfile();
    this.lguser = this.cookie.get('luname');
    this.addrmclass(adc, rmc, id, st);
  }
  updateDataOfUser(uAttr, adc, rmc, id, st) {
    console.log(uAttr);
    if (uAttr == "uname")
      this.postData = { 'attr': uAttr, 'uid': this.lgid, 'toBeUpdated': this.lguser }
    else if (uAttr == "email")
      this.postData = { 'attr': uAttr, 'uid': this.lgid, 'toBeUpdated': this.uemail }
    else if (uAttr == "phone")
      this.postData = { 'attr': uAttr, 'uid': this.lgid, 'toBeUpdated': this.phn }
    else if (uAttr == "status")
      this.postData = { 'attr': uAttr, 'uid': this.lgid, 'toBeUpdated': this.status }
    else if (uAttr == "location")
      this.postData = { 'attr': uAttr, 'uid': this.lgid, 'toBeUpdated': this.uloc }

    this.http.post(this.appService.API_ENDPOINT + 'updateDataOfUser', this.postData)
      .subscribe(data => {
        if (data == 1) {
          this.addrmclass(adc, rmc, id, st);
          console.log(data);
          if (uAttr == "uname") {
            this.cookie.set('luname', this.lguser);
            this.lguser = this.cookie.get('luname');
          }

          // document.getElementById("otpopen").classList.add("open");
        } else if (data == 'ER_DUP_ENTRY') {
          console.log("else" + data);
        }

      },
      err => console.log(err),
      () => console.log());
  }
  enableUProfile() {
    this.isUserProvileEnabled = true;
    this.http.get(this.appService.API_ENDPOINT + 'userProfileDetails', {
      params: {
        uid: this.lgid,

      }
    })
      .subscribe(data => {
        //this.userchats = data;
        console.log(data);
        this.uemail = data[0].email;
        this.phn = data[0].phone;
        this.status = data[0].status;
        this.uloc = data[0].location;
        this.upro_path = "http://www.sarvaamexporters.com/" + data[0].pro_path;
        this.ucover_path = "http://www.sarvaamexporters.com/" + data[0].cover_path;

      },
      err => console.log(err),
      () => console.log());


  }
  closeUProfile() {
    this.isUserProvileEnabled = false;
  }


  enalbeProSett() {
    this.isProSett = true;
    this.isProFfSett = false;
    this.isProFfPenSett = false;
  }

  listFriendsAndRequest() {
    this.postData = { 'lgid': this.lgid };
    this.http.post(this.appService.API_ENDPOINT + 'getUserFriends', this.postData)
      .subscribe(data => {
        this.usfrlt = data;
        console.log(this.usfrlt);
      },
      err => console.log(err),
      () => console.log());
  }
  enalbeFrsSett() {
    this.isProFfSett = true;
    this.isProFfPenSett = false;
    this.isProSett = false;
    this.listFriendsAndRequest();
  }
  enalbeFrPenSett() {
    this.isProFfPenSett = true;
    this.isProFfSett = false;
    this.isProSett = false;
    this.listFriendsAndRequest();

  }
  
  isFriendRequestSent(id){
    this.postData = { 'uid': id, "ulgid": this.lgid, "rson": this.appService.currentDate()};
    this.http.post(this.appService.API_ENDPOINT + 'isFriendRequestSent', this.postData)
      .subscribe(data => {
        if (data == 1 ) {
          this.appService.presentToast("Request has been sent", 'bottom',2000);

        } else {
          this.appService.presentToast("Request unable to send", 'bottom',2000);

        }

      },
      err => console.log(err),
      () => console.log());
  }



  isFriendRequestAccepted(id, action) {

    this.postData = { 'uid': id, 'action': action, "ulgid": this.lgid };
    console.log(this.postData);
    this.http.post(this.appService.API_ENDPOINT + 'isFriendRequestAccepted', this.postData)
      .subscribe(data => {
        this.listFriendsAndRequest();
        //console.log(data);
        if (data == 1 && action == "yes") {
          this.appService.presentToast("Added in you friend list...", 'bottom',2000);

        } else {
          this.appService.presentToast("Removed form the list...", 'bottom',2000);

        }

      },
      err => console.log(err),
      () => console.log());
  }



  userProfileChange(event, whi) {
    const formData: any = new FormData();
    const files: Array<File> = event.target.files[0];

    var imgtype = event.target.files[0].type;
    console.log(event.target.files[0]);
    imgtype = imgtype.split("/");
    if (whi == "profile") {
      formData.append("uploads[]", files, this.lgid + "_profile." + imgtype[1]);

      this.http.post(this.appService.API_ENDPOINT + 'userProImageUpdate', formData)
        .subscribe(files => {
          this.enableUProfile();
        })
    } else {
      formData.append("uploads[]", files, this.lgid + "_cover." + imgtype[1]);

      this.http.post(this.appService.API_ENDPOINT + 'userProImageUpdate', formData)
        .subscribe(files => {
          this.enableUProfile();
        })
    }


  }
  selectGroupChatPerson(id,name,uid){
    console.log(this.gropChatSelectedper.indexOf(uid));
    /*if(this.gropChatSelectedper.indexOf(uid) == -1) {
      this.gropChatSelectedid.push(uid);
      this.gropChatSelectedper.push(name);
    }*/
    document.getElementById(id).classList.toggle("selected");
    console.log(this.gropChatSelectedid+"....."+this.gropChatSelectedper);
    console.log(this.usfrlt)

    /*for(i=0;i<this.gropChatSelectedid.length;i++){
      for(i=0;i<this.gropChatSelectedid.length;i++){
        
      }  
    }*/
  }

  identifyPrivateGrop(rid,chatType){
      if(chatType=='chat'){
        this.isChatEnabled(rid);
      }else{
        console.log("groupchat funtionality");
      }
  }
  isChatEnabled(rid) {
    console.log(rid);
    this.navCtrl.push(ChatBoxPage, {
      rid: rid
    })
  }

  isFoundFriend() {
    this.http.get(this.appService.API_ENDPOINT + 'Searchyourfriend', {
      //this.http.get(this.appService.API_ENDPOINT+'SearchPeoples', {
      params: {
        srchkey: this.srfr
      }
    })
      .subscribe(data => {
        this.srfrlst = data;
      },
      err => console.log(err),
      () => console.log(this.srfrlst));
  }
  hasNoSelectedArtefacts() {
    return this.srfrlst.length === 0;
  }
  getUserChats() {
    this.http.get(this.appService.API_ENDPOINT + 'getMsgOfUser', {
      params: {
        uid: this.lgid,
      }
    })
      .subscribe(data => {
        this.userchats = data;
      },
      err => console.log(err),
      () => console.log(this.userchats));
  }
  getUserProfilePic() {
    this.http.get(this.appService.API_ENDPOINT + 'getUserProfilePic', {
      params: {
        uid: this.lgid,
      }
    })
      .subscribe(data => {
        this.lupic = "http://www.sarvaamexporters.com/" + data[0].pro_path;
      },
      err => console.log(err),
      () => console.log());
  }
  ngOnInit() {
    this.lgid = this.cookie.get('luser');
    this.lguser = this.cookie.get('luname');
    this.getUserChats();
    this.getUserProfilePic();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DashPage');
  }

}
