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
  places;
  private cardsListRef= this.adb.list<Place>('cards');
  constructor(public http: HttpClient,private adb:AngularFireDatabase) {
  }

  addPlace(title:string,description:string,location:any,imageUrl:string){
    const place =new Place(title,description,location,imageUrl);    
    let data=this.adb.list("/cards/").push({
      place
    });
}

loadPlaces(){
    return this.cardsListRef;
}

deletePlace(index:number)
{
    this.places.splice(index,1);
}



}
