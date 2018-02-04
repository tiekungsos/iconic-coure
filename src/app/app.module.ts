import { ChartPage } from './../pages/chart/chart';
import { RegisterPage } from './../pages/register/register';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { ListPage } from '../pages/list/list';
import { TabPage } from '../pages/tab/tab';
import { LoginPage } from '../pages/login/login';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AddMoviePage } from '../pages/add-movie/add-movie';
import { EditMoviePage } from '../pages/edit-movie/edit-movie';
import { SetNotificationPage } from '../pages/set-notification/set-notification';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';



  var config = {
    apiKey: "AIzaSyAhx0EbgrpXvBsC7hvIewMRn4afataio9c",
    authDomain: "ionic-4ff54.firebaseapp.com",
    databaseURL: "https://ionic-4ff54.firebaseio.com",
    projectId: "ionic-4ff54",
    storageBucket: "",
    messagingSenderId: "112899462531"
  };



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProfilePage,
    ListPage,
    TabPage,
    LoginPage,
    RegisterPage,
    AddMoviePage,
    EditMoviePage,
    ChartPage,
    SetNotificationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),//แกนกลาง angular
    AngularFireAuthModule, //เปน auth ที่เอามาใช้
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProfilePage,
    ListPage,
    TabPage,
    LoginPage,
    RegisterPage,
    AddMoviePage,
    EditMoviePage,
    ChartPage,
    SetNotificationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LocalNotifications,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
})
export class AppModule {}
