import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddPlacePage } from '../add-place/add-place';
import { Place } from '../../models/place';
import { PlacesService } from '../../providers/places';

/**
 * Generated class for the PlacesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-places',
  templateUrl: 'places.html',
})
export class PlacesPage {
  addPlacePage=AddPlacePage;
  places:Place[]=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private placesSvc:PlacesService) {

  }
  ionViewWillEnter(){
    this.places=this.placesSvc.loadPlaces();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlacesPage');
  }

}
