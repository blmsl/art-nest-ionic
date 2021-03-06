import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AngularFirestore } from "@angular/fire/firestore";
import { Storage } from "@ionic/storage";
import { appconfig } from "../../app/app.config";
import { User } from "../../models/user";

import * as firebase from 'firebase/app';
import 'firebase/firestore';

import { FirebaseProvider } from "../../providers/firebase";
import { ChatRoomPage } from "../chat-room/chat-room";

import { AlertController } from "ionic-angular";

@IonicPage()
@Component({
  selector: 'page-list-user',
  templateUrl: 'list-user.html',
})
export class ListUserPage implements OnInit{
  availableusers: any = [];
  chatuser:User;
  emailSet:any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: AngularFirestore,
    private storage: Storage,
    private firebaseProvider: FirebaseProvider,
    private alertCtrl: AlertController
  ){}

  ngOnInit() {
    //Fetch other users
    this.storage.get("currentUser").then(currentUser => {
      let userCredential = JSON.parse(currentUser);
      this.chatuser = {
        email: userCredential.user.email,
        uID: userCredential.user.uID,
        username: userCredential.user.displayName,
        deviceID: '',
        time: new Date().getTime()
      }
     
      firebase.firestore().collection(appconfig.chats_endpoint)
      .where("sender", "==", this.chatuser.email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          // let data = doc.data().data;
          // dataSet.push(doc.data())
          if(!this.emailSet.includes(doc.data().receiverEmail)){
            this.emailSet.push(doc.data().receiverEmail);
          }
        })
        firebase.firestore().collection(appconfig.chats_endpoint)
        .where("receiverEmail", "==", this.chatuser.email)
        .get()
        .then((snapshot1) => {
          snapshot1.forEach((doc) => {
            // let data = doc.data().data;
            // dataSet.push(doc.data())
            if(!this.emailSet.includes(doc.data().sender)){
              this.emailSet.push(doc.data().sender);
            }
          })

          this.db
            .collection<User>(appconfig.users_endpoint)
            .valueChanges()
            .subscribe(users => {

              let alert = this.alertCtrl.create({
                title: 'Init List User',
                subTitle: JSON.stringify(this.emailSet),
                buttons: [
                  {
                    text: "OK"
                  }
                ]
              });
              alert.present();
              
              //this.availableusers = users;
              console.log(users);
              this.availableusers = users.filter(user => {
                if(this.emailSet.includes(user.email)){
                  return user;
                }
              });
            });

        })
      }).catch((err) => {
        let alert = this.alertCtrl.create({
          title: 'Init List User Error',
          subTitle: err.message,
          buttons: [
            {
              text: "OK"
            }
          ]
        });
        alert.present();
      })
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListUserPage');
  }

  goToChat(chatpartner) {
    this.firebaseProvider.currentChatPairId = this.firebaseProvider.createPairId(
      this.chatuser,
      chatpartner
    );

    this.firebaseProvider.currentChatPartner = chatpartner;

    this.navCtrl.push(ChatRoomPage).catch((error) => {
      let alert = this.alertCtrl.create({
        title: 'Failed goToChat',
        subTitle: error.message,
        buttons: [
          {
            text: "OK"
          }
        ]
      });
      alert.present();
    });
  } //goToChat

}
