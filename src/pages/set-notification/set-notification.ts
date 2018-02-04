import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { DateTime } from 'ionic-angular/components/datetime/datetime';
import { LoadingCmp } from 'ionic-angular/components/loading/loading-component';
import BasePage from '../base';

/**
 * Generated class for the SetNotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-set-notification',
  templateUrl: 'set-notification.html',
})
export class SetNotificationPage extends BasePage {

  date:string;
  time:string;
  Movies:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public localNotifications:LocalNotifications  ,
    public toastCtrl : ToastController,
    public loadingCtrl : LoadingController
  ) {
    super(toastCtrl,loadingCtrl)
    this.Movies = this.navParams.get('Movies');
    console.log(this.Movies);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetNotificationPage');
  }

  set(){
   console.log(this.date,this.time);

   let pasrsedDatetime = Date.parse(this.date + ' ' + this.time);
   let datetime = new Date(pasrsedDatetime);

   console.log(datetime.toDateString());
   this.localNotifications.schedule({
    id: 1,
    text: 'คุณมีหนังเรื่อง '+ this.Movies.data.name,
    firstAt : DateTime,
    every : 'minute' 

  })

  this.showToast(JSON.stringify(this.localNotifications.get(1)))

  }

 

  turnOff(){
    this.localNotifications.clearAll();
    // this.localNotifications.cancel(this.Movies.id)
    // .then((result) => {
    // alert(result);
    // })
    // .catch((error) => {
    //   alert(error);
    // })

  }

  
}
