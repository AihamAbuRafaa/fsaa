import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlacesProvider } from '../../providers/places/places';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit{

  constructor(public navCtrl: NavController, public navParams: NavParams,public placesSvc:PlacesProvider) {
  }
  ngOnInit(){
    this.placesSvc.getPlaces();
  }

  ionViewDidLoad() {
    
  }
  goToPlaces()
  {
    this.navCtrl.push('PlacesPage');
  }
  addPlace(){ 
    this.navCtrl.push('AddPlacePage');   
  }

  emergencyClicked()
  {
    this.navCtrl.push('EmergencyPage');
  }

  goToGood()
  {
    this.navCtrl.push('GoodToKnowPage')
  }

}
