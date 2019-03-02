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
  places: any[] = [];
  keys: any[] = [];
  cachedPlaces: any[] = [];
  public country: number = 108;
  uid: string;
  name:string;
  constructor(public http: HttpClient, private adb: AngularFireDatabase, ) {

  }
  getPlaces() {
    return new Promise((resolve, reject) => {
      firebase.database().ref('/cards/').once('value').then(snapshot => {
        this.places = [];
        this.cachedPlaces = [];
        snapshot.forEach(item => {
          var itemVal = item.val();
          this.keys.push(item.key)
          this.places.push(itemVal);
          this.cachedPlaces.push(itemVal);
        });
      });
      resolve(this.places)
    })
  }
  async getImages() {
    try {
      this.places.map(p => {
        let pa: any = p;
        if (pa.place.imageUrl) {
          firebase.storage().ref(pa.place.imageUrl).getDownloadURL().then(url => {
            p.image = url;
          })
        }
      })
    } catch (err) {
      console.log(err)
    }

  }

  addPlace(title: string, description: string, location: any, imageUrl: string, uid: string) {
    let image = "";
    const place = new Place(title, description, location, imageUrl, false, 108, uid, image);
    let data = this.adb.list("/cards/").push({
      place
    });
  }

  loadPlaces() {
    this.places = this.cachedPlaces;
    return this.places;
  }

  deletePlace(i) {
    return new Promise((resolve, reject) => {
      let index = this.places.findIndex(p => p.place.description == i.description)
      firebase.database().ref('cards').child(this.keys[index]).remove();
      let a: any = this.places[index].imageUrl
      if(a)
      {
      firebase.storage().ref(a).delete()
      }
      this.places.splice(index, 1);
      resolve(this.places)
    })
  }

  async loadMyPlaces() {
    this.places = this.cachedPlaces;
    return this.places;
  }



}
