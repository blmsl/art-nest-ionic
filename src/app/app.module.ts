import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { DatePicker } from '@ionic-native/date-picker'
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { IonicStorageModule } from "@ionic/storage";

/* SERVICE */
import { APIService } from '../service/webAPI';

/* FIREBASE */
import { Firebase } from '@ionic-native/firebase';
import { FCM } from '@ionic-native/fcm';
import { FirebaseProvider } from '../providers/firebase';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { appconfig } from "./app.config";

/* PAGE */
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ArtistPage } from '../pages/artist/artist';
import { ArtworkPage } from '../pages/artwork/artwork';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { SettingPage } from '../pages/setting/setting';
import { IntroPage } from '../pages/intro/intro';
import { RequestPage } from '../pages/request/request';
import { ProjectPage } from '../pages/project/project';
import { MessagePage } from '../pages/message/message';
import { BeArtistPage } from '../pages/be-artist/be-artist';
import { ListUserPage } from '../pages/list-user/list-user';
import { ChatRoomPage } from '../pages/chat-room/chat-room';

/* MODAL */
import { ModalOrderPage } from '../pages/modal-order/modal-order';
import { ModalDetailPage } from '../pages/modal-detail/modal-detail';
import { Camera } from '@ionic-native/camera';
import { DatePipe } from '@angular/common';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { SearchPage } from '../pages/search/search';

@NgModule({
  declarations: [
    MyApp,
    ArtistPage,
    ArtworkPage,
    IntroPage,
    LoginPage,
    RegisterPage,
    SettingPage,
    HomePage,
    RequestPage,
    ProjectPage,
    MessagePage,
    BeArtistPage,
    ModalOrderPage,
    ModalDetailPage,
    ListUserPage,
    ChatRoomPage,
    EditProfilePage,
    SearchPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    AngularFireModule.initializeApp(appconfig.firebase),
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ArtistPage,
    ArtworkPage,
    IntroPage,
    LoginPage,
    RegisterPage,
    SettingPage,
    HomePage,
    RequestPage,
    ProjectPage,
    MessagePage,
    BeArtistPage,
    ModalOrderPage,
    ModalDetailPage,
    ListUserPage,
    ChatRoomPage,
    EditProfilePage,
    SearchPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Firebase,
    FCM,
    FirebaseProvider,
    Camera,
    HttpClient,
    HttpClientModule,
    DatePicker,
    DatePipe,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    APIService
  ]
})
export class AppModule {}
