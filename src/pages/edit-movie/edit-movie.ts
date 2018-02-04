// import { ToastController } from 'ionic-angular/components/toast/toast-controller';
// import { ListPage } from './../list/list';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AngularFirestore } from 'angularfire2/firestore';
// import { FirebaseAuth } from '@firebase/auth-types';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
// import { Toast } from 'ionic-angular/components/toast/toast';
import BasePage from '../base';

/**
 * Generated class for the EditMoviePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-movie',
  templateUrl: 'edit-movie.html',
})

export class EditMoviePage extends BasePage {

  id: string;
  uid: string;


  name: string;
  description: string;
  length: number;
  image: string ;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public FirebaseAuth : AngularFireAuth,
    public FirebaseFirestore : AngularFirestore,
    public lodingCtrl: LoadingController
    
  
  ) {
    super(toastCtrl,lodingCtrl);

      this.id = this.navParams.get('id');
      console.log(this.id)
  } 
 
  
  ionViewDidLoad() {
    this.uid = this.FirebaseAuth.auth.currentUser.uid;
    this.FirebaseFirestore
  
    .collection('users')
    .doc(this.uid)
    .collection('Movies')
    .doc(this.id)
    .valueChanges()
    .subscribe((movie:any) => {

     this.name = movie.name;
     this.description = movie.description;
     this.length = movie.length;
     this.image = movie.img;
    }


    )
    console.log('ionViewDidLoad EditMoviePage');
  }

  save(){
this.FirebaseFirestore
.collection('users')
.doc(this.uid)
.collection('Movies')
.doc(this.id)
.update({
  name: this.name,
  description: this.description,
  length: this.length,
  img: this.image
})
.then(()=>{ 
  this.hideLoading();
  this.showToast("Update");
  this.navCtrl.pop();

})
.catch(error=> {
  this.hideLoading();
  this.showToast(error);
})
  }

}
