import { Component } from '@angular/core';
import { IonicPage, NavController,ModalController, NavParams } from 'ionic-angular';
import { Countries } from '../../models/countries';
import { EmergencyServiceProvider } from '../../providers/emergency-service/emergency-service';

/**
 * Generated class for the EmergencyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-emergency',
  templateUrl: 'emergency.html',
})
export class EmergencyPage {
  countries:Countries[]=[];
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private countriesSvc:EmergencyServiceProvider,
     private modalCtrl : ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmergencyPage');
  }

  async ionViewWillEnter()
  {
    this.countries = this.countriesSvc.loadCountries();
  }

  callPolice()
  {


  }

  callAmbulance()
  {

  }

  callFireFighting()
  {

  }





}
