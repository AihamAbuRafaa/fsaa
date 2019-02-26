import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Modal } from 'ionic-angular';
import { AddPlacePage } from '../add-place/add-place';
import { Place } from '../../models/place';
import { PlacePage } from '../place/place';
import { PlacesProvider } from '../../providers/places/places';

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
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private placesSvc:PlacesProvider,
     private modalCtrl : ModalController) {

  }
  async ionViewWillEnter(){
    this.places=this.placesSvc.loadPlaces(); 
    console.log(this.places)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PlacesPage');
  }
  onOpenPlace(place:Place,index:number){
    const modal=this.modalCtrl.create('PlacePage',{place:place,index:index});
    modal.present();
  }
  addPlace()
  {
    this.navCtrl.push('AddPlacePage');
  }

}
