import { Component, OnInit } from '@angular/core';
import { IonicPage,NavController,NavParams, Platform } from 'ionic-angular';
import { CookieService} from 'ngx-cookie-service';
import { HttpClient} from '@angular/common/http';
import * as io from 'socket.io-client';
import * as $ from 'jquery';
import { AppService} from '../service/appService';
import { SpeechRecognition} from '@ionic-native/speech-recognition';
/**
 * Generated class for the ChatBoxPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-chat-box',
    templateUrl: 'chatbox.html',
})
export class ChatBoxPage implements OnInit {
    private lgid;
    private rcid;
    private receiverProPic;
    private allChats;
    private uniChatId;
    private umsg;
    private rname;
    private usocket;
    socket: SocketIOClient.Socket;
    private postData = {};
    private seeUserDataArray;
    private isMoreOpen = false;

    matches: String[];
    isRecording = false;
    isVoiceSectionEnable = false;
    constructor(private appService: AppService, public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, private cookie: CookieService, private speechRecognition: SpeechRecognition, private plt: Platform, ) {
        this.socket = io.connect(this.appService.API_ENDPOINT);
    }

    private supportedLanguagesAndroid = ["af-ZA", "id-ID", "ms-MY", "ca-ES", "cs-CZ", "da-DK", "de-DE", "en-AU", "en-CA",
        "en-001", "en-IN", "en-IE", "en-NZ", "en-PH", "en-ZA", "en-GB", "en-US", "es-AR",
        "es-BO", "es-CL", "es-CO", "es-CR", "es-EC", "es-US", "es-SV", "es-ES", "es-GT",
        "es-HN", "es-MX", "es-NI", "es-PA", "es-PY", "es-PE", "es-PR", "es-DO", "es-UY",
        "es-VE", "eu-ES", "fil-PH", "fr-FR", "gl-ES", "hr-HR", "zu-ZA", "is-IS", "it-IT",
        "lt-LT", "hu-HU", "nl-NL", "nb-NO", "pl-PL", "pt-BR", "pt-PT", "ro-RO", "sl-SI",
        "sk-SK", "fi-FI", "sv-SE", "vi-VN", "tr-TR", "el-GR", "bg-BG", "ru-RU", "sr-RS",
        "uk-UA", "he-IL", "ar-IL", "ar-JO", "ar-AE", "ar-BH", "ar-DZ", "ar-SA", "ar-KW",
        "ar-MA", "ar-TN", "ar-OM", "ar-PS", "ar-QA", "ar-LB", "ar-EG", "fa-IR", "hi-IN",
        "th-TH", "ko-KR", "cmn-Hans-CN", "cmn-Hans-HK", "cmn-Hant-TW", "yue-Hant-HK",
        "ja-JP"
    ];


    ionViewDidLoad() {
        console.log('ionViewDidLoad ChatBoxPage');
    }

    formatAMPM() {
        var d = new Date(),
            sec = d.getSeconds().toString().length == 1 ? '0' + d.getSeconds() : d.getSeconds(),
            minutes = d.getMinutes().toString().length == 1 ? '0' + d.getMinutes() : d.getMinutes(),
            hours = d.getHours().toString().length == 1 ? '0' + d.getHours() : d.getHours(),
            //ampm = d.getHours() >= 12 ? 'pm' : 'am',
            months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        //days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        return months[d.getMonth()] + ' ' + d.getDate() + ' ' + d.getFullYear() + ' ' + hours + ':' + minutes + ':' + sec;
    }

    getPermission() {
        this.speechRecognition.hasPermission()
            .then((hasPermission: boolean) => {
                if (!hasPermission) {
                    this.speechRecognition.requestPermission();
                }
            });
    }
    triggerVoiceMessage(voicInput) {
        this.umsg = voicInput;
        this.isMessageSent("text");
    }
    closeVoiceMessage() {
        this.isVoiceSectionEnable = false;
    }
    isMessageSent(input) {
        //this.getPermission();
        console.log(input);
        if (input == "voice") {
            this.isVoiceSectionEnable = true;
            let options = {
                language: 'th-TH'
            }
            // this.speechRecognition.startListening().subscribe(matches => {
            //   this.isVoiceSectionEnable = true;
            //   this.matches = matches;
            //   console.log(this.matches);

            // });
            this.isRecording = true;
        } else {
            console.log(this.umsg);
            // this.socket.emit('sendMessage', { "msg": this.umsg, "to": this.uniChatId, "by": this.lgid, 'rec': this.rcid, 'time': this.formatAMPM() });
            //  console.log(this.umsg + "..." + this.rcid);
        }
    }


    whichTextMessage() {
        //console.log(this.umsg.trim().length);
        if ((this.umsg.trim()).length > 0) {
            document.getElementById("chatbtn").classList.remove("voiceText");
            document.getElementById("chatbtn").classList.add("Text");
        } else {
            document.getElementById("chatbtn").classList.add("voiceText");
            document.getElementById("chatbtn").classList.remove("Text");
        }
    }

    GetOneComunicationChatHis() {
        this.http.get(this.appService.API_ENDPOINT + 'whichChatEnabled', {
                params: {
                    rid: this.rcid,
                    luid: this.lgid

                }
            })
            .subscribe(data => {
                    this.allChats = data;
                    this.uniChatId = data[0].chatid;
                    this.rname = data[0].uname;
                    this.receiverProPic = "http://www.sarvaamexporters.com/" + data[0].pro_path;
                },
                err => console.log(err),
                () => console.log(this.allChats));
    }

    openMoreOptions() {
        this.isMoreOpen = true;
    }

    openUserPro(a) {
        document.getElementById("othupro").classList.toggle("show");
        this.isMoreOpen = false;
        //document.getElementById("mrdplst").classList.toggle("expand");
        if (a == "open") {
            document.getElementById("pghd").classList.toggle("hideHeader");
            this.postData = {
                'whu': this.rcid
            };
            this.http.post(this.appService.API_ENDPOINT + 'userProfileDetails', this.postData)
                .subscribe(data => {
                        this.seeUserDataArray = data;
                        console.log(this.seeUserDataArray);
                    },
                    err => console.log(err),
                    () => console.log());
        } else if (a == "close") {
            //document.getElementById("mrdplst").classList.toggle("expand");
            document.getElementById("pghd").classList.toggle("hideHeader");
        }

    }

    getCooky() {
        return this.cookie.get('luser');
    }
    private handleMessageReceivedEvent(data): void {
        //console.log(data.by);
        this.umsg = "";
        if (data.by == this.lgid) {
            $("#chul").append("<li class='clr'> <p _ngcontent-c1 class='fd fr>" + data.msg + "</p></li>");
        } else {
            $("#chul").append("<li class='clr'> <p _ngcontent-c1 class='fu fl''>" + data.msg + "</p></li>");
        }
    }

    joinRoom() {
        var urmsl
        this.postData = {
            'uid': this.lgid
        }
        this.http.post(this.appService.API_ENDPOINT + 'toSetRoom', this.postData)
            .subscribe(data => {
                    for (var i = 0; i < Object.keys(data).length; i++) {
                        this.socket.emit('joinRoom', {
                            "sid": data[i].chatid
                        });
                    }
                },
                err => console.log(err),
                () => console.log());
    }


    ngOnInit() {
        this.lgid = this.cookie.get('luser');
        this.rcid = this.navParams.get("rid");
        this.GetOneComunicationChatHis();
        this.joinRoom();
        //this.socket.emit('joinRoom', { "sid": '123' });
        this.socket.on("msgReceived", this.handleMessageReceivedEvent.bind(this));
    }

}