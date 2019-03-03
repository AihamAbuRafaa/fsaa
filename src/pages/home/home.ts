import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { PlacesProvider } from '../../providers/places/places';
import { CountriesProvider } from '../../providers/countries/countries';
import { CATCH_STACK_VAR } from '@angular/compiler/src/output/abstract_emitter';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { Geolocation } from 'ionic-native';
import { Place } from '../../models/place';
import { Location } from '../../models/location';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import firebase from 'firebase'
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

  countries:any;
  name:any;
  location:Location={
    lat:0,
    lng:0
  }
  user:any;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
    public placesSvc:PlacesProvider,
    private countriesSvc : CountriesProvider,
    private nativeGeocoder: NativeGeocoder,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private autah:AuthServiceProvider,
    private alertCtrl:AlertController) {
  }
  async ngOnInit(){
    const loader = this.loadingCtrl.create({
      content: 'Getting your location...'
    });
    loader.present();
    try{
    await this.placesSvc.getPlaces();
    await this.countriesSvc.getCountries();
    this.countries=this.countriesSvc.loadCountries();

    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
  };

  Geolocation.getCurrentPosition().then((resp) => {
    loader.dismiss();
    this.location.lat = resp.coords.latitude
    this.location.lng = resp.coords.longitude
    this.placesSvc.mylocation.lat=resp.coords.latitude
    this.placesSvc.mylocation.lng=resp.coords.longitude

  }).catch((error) => {
    loader.dismiss();
    const toast = this.toastCtrl.create({
      message: 'Could get location , please pick it manullay!',
      duration: 2500
    })
  })
  await firebase.auth().onAuthStateChanged(user=>{
    this.user=user;
  })


    
  this.nativeGeocoder.reverseGeocode(this.location.lat, this.location.lng, options)
    .then((result: NativeGeocoderReverseResult[]) => this.name=JSON.stringify(result[0]))
    .catch((error: any) => console.log(error));
  
    }catch(err)
    {
      console.log(err)
    }
  }

  ionViewDidLoad() {
    
  }
  goToPlaces()
  {
    this.navCtrl.push('PlacesPage');
  }
  goToPlacesNextMe(){
    let alert = this.alertCtrl.create({
      title: 'Destiniton',
      inputs: [
        {
          name: 'search',
          placeholder: 'Write distance (km)'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            
          }
        },
        {
          text: 'Search',
          handler: sear => {
            this.navCtrl.push('PlacesNextMePage',{search:sear});
          }
          }
      ]
    });
    alert.present();

  }
  addPlace(){ 
    this.navCtrl.push('AddPlacePage');   
  }

  searchNextToYou()
  {
    this.navCtrl.push('SearchNextToYouPage');       
  }

  emergencyClicked()
  {
    this.navCtrl.push('EmergencyPage');
  }

  goToGood()
  {
    this.navCtrl.push('GoodToKnowPage')
  }
  onChange(i){
    this.countriesSvc.countryNow=i-0;
    this.placesSvc.country=i-0;

  }

}
