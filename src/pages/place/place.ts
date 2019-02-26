import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Place } from '../../models/place';
import { PlacesProvider } from '../../providers/places/places';
import { ThrowStmt } from '@angular/compiler';



@IonicPage()
@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
})
export class PlacePage {
  place;
  index:number;
  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCtr:ViewController,private placeSvc:PlacesProvider) {
    this.place=this.navParams.get('place');
    this.place=this.place.place;
    this.index=this.navParams.get('index');
   }
  onLeave(){
    this.viewCtr.dismiss();
  }
  onDelete(){
    this.placeSvc.deletePlace(this.index);
    this.onLeave();
  }

}
