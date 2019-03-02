import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Place } from '../../models/place';
import firebase from 'firebase'
import { Location } from '../../models/location';

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
  mylocation:Location={
    lat:0,
    lng:0
  }
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

  async addPlace(title: string, description: string, location: any, imageUrl: string, uid: string) {
    let image = "";
    const place = new Place(title, description, location, imageUrl, false, 108, uid, image);
    let data =await this.adb.list("/cards/").push({
      place
    });
    await this.getPlaces();
    await this.getImages();
  }

  loadPlaces() {
    this.places = this.cachedPlaces;
    return this.places;
  }

  async deletePlace(i) {
    await this.removePlace(i);
    await this.getPlaces();
    await this.getImages();
  }

   removePlace(i){
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

   getDistanceFromLatLonInKm(lat1,lon1) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(this.mylocation.lat-lat1);  // deg2rad below
    var dLon = this.deg2rad(this.mylocation.lng-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(this.mylocation.lat)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
   deg2rad(deg) {
    return deg * (Math.PI/180)
  }



}
