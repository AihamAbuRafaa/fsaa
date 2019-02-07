import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Location } from '../../models/location';
import { Geolocation } from 'ionic-native';


/**
 * Generated class for the AddPlacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {
  location: Location = {
    lat: 33.201192,
    lng: 35.778557
  };
  locationIsSet = false;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController){
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPlacePage');
  }
  onOpenMap() {
    const modal = this.modalCtrl.create('SetLocationPage', { location: this.location, isSet: this.locationIsSet });
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        this.location = data.location;
        this.locationIsSet = true;
      }
    })

  }
  onLocate() {
    Geolocation.getCurrentPosition().then((resp) => {
      this.location.lat= resp.coords.latitude
      this.location.lng= resp.coords.longitude
      this.locationIsSet=true;
     }).catch((error) => {
       console.log('Error getting location', error);
     });

  }

}
