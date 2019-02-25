import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { Location } from '../../models/location';
import { Geolocation , Camera, CameraOptions} from 'ionic-native';
import { NgForm } from '@angular/forms';


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
  imageUrl='';
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private loadingCtrl:LoadingController,
    private toastCtrl:ToastController){
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
    const loader = this.loadingCtrl.create({
      content:'Getting your location...'
    });
    loader.present();
    Geolocation.getCurrentPosition().then((resp) => {
      loader.dismiss();
      this.location.lat= resp.coords.latitude
      this.location.lng= resp.coords.longitude
      this.locationIsSet=true;
     }).catch((error) => {
       loader.dismiss();
       const toast = this.toastCtrl.create({
         message:'Could get location , please pick it manullay!',
         duration : 2500
       })
       toast.present();
       console.log('Error getting location', error);
     });

  }
  onSubmit(f:NgForm){
    console.log(f.value);
  }
  onTakePhoto(){
    Camera.getPicture({
      encodingType:Camera.EncodingType.JPEG,
      correctOrientation:true,
    }).then(imageData=>{
       this.imageUrl=imageData
    }
    ).catch(
      err=>{
        console.log(err)
      }
    );
  }

}
