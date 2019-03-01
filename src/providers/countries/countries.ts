import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase'
/*
  Generated class for the CountriesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CountriesProvider {
  countries:any;
  countryNow:number=108;
  constructor(public http: HttpClient) {
    console.log('Hello CountriesProvider Provider');
  }
  getCountries()
  {
    this.countries=[];
    return new Promise((resolve,reject)=>{
     firebase.database().ref('/data/').once('value').then(snapshot => {
       snapshot.forEach(item => {
         var itemVal = item.val();
         this.countries.push(itemVal);
       });
     });
     resolve(this.countries)
    })
  }

  loadCountries(){
    return this.countries;
  }

}
