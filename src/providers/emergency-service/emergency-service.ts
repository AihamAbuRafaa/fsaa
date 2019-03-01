import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Place } from '../../models/place';
import firebase from 'firebase'
import { Countries } from '../../models/countries';

/*
  Generated class for the EmergencyServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EmergencyServiceProvider {
   countries:any[]=[];
  
  constructor(public http: HttpClient , private adb:AngularFireDatabase) {
    firebase.database().ref('/data/').once('value').then(snapshot=> {
            snapshot.forEach( item => {
        var itemVal = item.val();
        this.countries.push(itemVal);
      });
    });
  }

  loadCountries(){
    return this.countries;
  }
}
