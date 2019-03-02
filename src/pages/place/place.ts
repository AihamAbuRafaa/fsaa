import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Place } from '../../models/place';
import { PlacesProvider } from '../../providers/places/places';
import { ThrowStmt } from '@angular/compiler';
import firebase from 'firebase'



@IonicPage()
@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
})
export class PlacePage {
  place;
  index:number;
  isDelete:boolean=false;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private viewCtr:ViewController,
    private placeSvc:PlacesProvider,
    private alertCtrl:AlertController,)
   {
    this.place=this.navParams.get('place');
    this.place=this.place.place;
    this.index=this.navParams.get('index');
    this.isDelete=this.navParams.get('is');
   }
  onLeave(){
    this.viewCtr.dismiss();
  }
  onDelete(){
    this.placeSvc.deletePlace(this.place);
    this.viewCtr.dismiss();
    this.navCtrl.setRoot("HomePage")
  }
  onReport(){
    let alert = this.alertCtrl.create({
      title: 'Report',
      inputs: [
        {
          name: 'report',
          placeholder: 'Content'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Report',
          handler: report => {
            let index=this.placeSvc.places.findIndex(d=> d.place.description==this.place.description)
            let a = firebase.database().ref("/cards/").child(this.placeSvc.keys[index]).child('reports').set({
              report,
            });
          }
          }
      ]
    });
    alert.present();
  }

}
