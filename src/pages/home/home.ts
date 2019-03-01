import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlacesProvider } from '../../providers/places/places';
import { CountriesProvider } from '../../providers/countries/countries';
import { CATCH_STACK_VAR } from '@angular/compiler/src/output/abstract_emitter';

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
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
    public placesSvc:PlacesProvider,
    private countriesSvc : CountriesProvider) {
  }
  async ngOnInit(){
    try{
    await this.placesSvc.getPlaces();
    await this.countriesSvc.getCountries();
    this.countries=this.countriesSvc.loadCountries();
    console.log(this.countries)
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
  onChange(i){
    this.countriesSvc.countryNow=i;
    this.placesSvc.country=i;
  }

}
