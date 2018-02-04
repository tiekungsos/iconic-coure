import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
// import { ViewChild } from '@angular/core/src/metadata/di';
/**
 * Generated class for the ChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html',
})
export class ChartPage {
@ViewChild('lineCanvas') lineCanvas;
lineChart : any;

uid:string;

datas=[];
labels=[];
img=[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth,
    public firebaseFirestore: AngularFirestore
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChartPage');
    this.uid = this.firebaseAuth.auth.currentUser.uid;
    // this.showLoading("Fetching data ...")
    this.firebaseFirestore
    .collection('users')
    .doc(this.uid)
    .collection('Movies')
    .valueChanges()
    .subscribe(movies => {
      console.log(movies);
      this.datas = movies.map( (movie:any)=> {
        return movie.length;
      })

      this.labels = movies.map( (movie:any)=> {
        return movie.name;
      })

      this.img = movies.map( (movie:any)=> {
        return movie.img;
      })
     

     this.lineChart = new Chart(this.lineCanvas.nativeElement, {
 
      type: 'line',
      data: {
          labels: this.labels,
          datasets: [
              {
                  label: "Movie",
                  fill: true,
                  lineTension: 0.1,
                  backgroundColor: "rgba(75,192,192,0.4)",
                  borderColor: "rgba(75,192,192,1)",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "rgba(75,192,192,1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(75,192,192,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: this.img,
                  pointHitRadius: 10,
                  data: this.datas,
                  spanGaps: false,
              }
          ]
      }
    
    });

    });

    


  }

}
