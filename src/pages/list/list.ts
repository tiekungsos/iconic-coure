import { LocalNotifications } from '@ionic-native/local-notifications';
import { ChartPage } from './../chart/chart';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Loading } from 'ionic-angular/components/loading/loading';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { AddMoviePage } from '../add-movie/add-movie';
import BasePage from '../base';
import { EditMoviePage } from '../edit-movie/edit-movie';
import { SetNotificationPage } from '../set-notification/set-notification';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  
  
})
export class ListPage extends BasePage{

  items = [];
  result  = [];
  uid: string = '';
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth,
    public firebaseFirestore: AngularFirestore,
    public toastCtrl: ToastController,
    public Loadingctrl: LoadingController,
    public barcodeScanner : BarcodeScanner
  )
   {
     super(toastCtrl,Loadingctrl);
  }

  ionViewDidLoad() {
    this.uid = this.firebaseAuth.auth.currentUser.uid;
    this.showLoading("Fetching data ...")
    this.firebaseFirestore
    .collection('users')
    .doc(this.uid)
    .collection('Movies')
    .snapshotChanges()
    // .valueChanges()
    .subscribe((data:any) => {
      this.items = [];

      data.map(action => {
        this.items.push({
          id : action.payload.doc.id,
          data : action.payload.doc.data()
        })
        //  console.log(action.payload.doc.data());
      });
 this.hideLoading();
    }, 
  (error) => {
    this.hideLoading();
   this.showToast(error);
  })

  }

  navigateAddMovie(){
    this.navCtrl.push(AddMoviePage);
  }


  edit(movieid){
    console.log(movieid)
    this.navCtrl.push(EditMoviePage,{
      id : movieid
    })
  }


  delete(movieid){
    console.log(movieid)

    this.firebaseFirestore 
    .collection('users')
    .doc(this.uid)
    .collection('Movies')
    .doc(movieid)
    .delete()
    .then(() =>{
      this.hideLoading();
      this.showToast("Delete Success")
    })
    .catch(error => {
      console.log('error');
     this.showToast(error);
    })
  
  }



  navigateChart(){
    this.navCtrl.push(ChartPage);
  }


  getItems(event){
  console.log(event);
  let val = event.target.value;
  console.log(val);
 

  
    if(val && val.trim != ''){
       this.result = this.items.filter((item) => {
         return (item.data.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
       }) ;

    }

    if(val == ''){
      this.result= this.items;
    }

    
  }

  navigateNotificationPage(movie){
    console.log(movie);
    this.navCtrl.push(SetNotificationPage, {
      movie : movie
      
    });
    
   
  }

  scanbarcode(){
    this.barcodeScanner.scan().then((barcodeData) => {
      // Success! Barcode data is here
      this.showToast(JSON.stringify(this.barcodeScanner))
     }, (err) => {
         // An error occurred
     });
  }
}
