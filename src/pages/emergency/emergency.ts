import { Component } from '@angular/core';
import { IonicPage, NavController,ModalController, NavParams } from 'ionic-angular';
import { Countries } from '../../models/countries';
import { EmergencyServiceProvider } from '../../providers/emergency-service/emergency-service';
import { CallNumber } from 'ionic-native';

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
     private callNumber : CallNumber) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmergencyPage');
  }

  async ionViewWillEnter()
  {
    this.countries = this.countriesSvc.loadCountries();
  }

  async callPolice()
  {
    try{
    await CallNumber.callNumber("100", true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
    }catch(err)
    {
      console.log(err)
    }
  }

  callAmbulance()
  {
    CallNumber.callNumber("101", true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

  callFireFighting()
  {
    CallNumber.callNumber("102", true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }
}
