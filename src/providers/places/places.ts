import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Place } from '../../models/place';
import firebase from 'firebase'

/*
  Generated class for the PlacesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlacesProvider {
  places: Place[] = [];
  constructor(public http: HttpClient, private adb: AngularFireDatabase) {
    
  }
   getPlaces(){
     this.places=[]
     return new Promise((resolve,reject)=>{
      firebase.database().ref('/cards/').once('value').then(snapshot => {
        snapshot.forEach(item => {
          var itemVal = item.val();
          this.places.push(itemVal);
        });
      });
      resolve(this.places)
     })
  }
  async getImages() {
    try {
       this.places.map(p=>{
           firebase.storage().ref('image228').getDownloadURL().then(url => {
            p.image = url;
        })
      })
      console.log(this.places)      
    } catch (err) {
      console.log(err)
    }

  }

  addPlace(title: string, description: string, location: any, imageUrl: string) {
    let image="";
    const place = new Place(title, description, location, imageUrl,image);
    let data = this.adb.list("/cards/").push({
      place
    });
  }

  loadPlaces() {
    return this.places;
  }

  deletePlace(index: number) {
    this.places.splice(index, 1);
  }



}
