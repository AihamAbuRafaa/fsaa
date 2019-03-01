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
     this.places=[];
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
         let pa : any =p;
         if(pa.place.imageUrl)
         {
           firebase.storage().ref(pa.place.imageUrl).getDownloadURL().then(url => {
            p.image = url;
            
        })
      }
      })
      console.log(this.places)      
    } catch (err) {
      console.log(err)
    }

  }

  addPlace(title: string, description: string, location: any, imageUrl: string) {
    let image="";
    const place = new Place(title, description, location, imageUrl,false,image);
    let data = this.adb.list("/cards/").push({
      place
    });
  }

  loadPlaces() {
    this.places=this.places.filter(i=>{
      let a:any=i;
      if(a.place.isApproved==true)
      {
        return i;
      }
    })
    return this.places;
  }

  deletePlace(index: number) {
    this.places.splice(index, 1);
  }



}
