import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Place } from '../../models/place';
import { PlacesService } from '../../providers/places';


@IonicPage()
@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
})
export class PlacePage {
  place:Place;
  index:number;
  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCtr:ViewController,private placeSvc:PlacesService) {
    this.place=this.navParams.get('place');
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
