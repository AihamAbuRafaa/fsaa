import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { PlacesProvider } from '../../providers/places/places';
import { AddPlacePage } from '../add-place/add-place';
import { Place } from '../../models/place';
import firebase from 'firebase'
/**
 * Generated class for the PlacesNextMePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-places-next-me',
  templateUrl: 'places-next-me.html',
})
export class PlacesNextMePage implements OnInit{
  addPlacePage=AddPlacePage;
  places:Place[]=[];
  loader :any;
  isMy:boolean=false;
  uid:string;
  distanation:number=50;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private placesSvc:PlacesProvider,
    private modalCtrl : ModalController,
    private loadingCtrl:LoadingController,) {
  }

  async ngOnInit(){
    try{
      let ww=this.navParams.get('i');
      let ee=this.navParams.get('search');
      this.distanation=ee.search-0;
      this.loader = this.loadingCtrl.create({
        content:'Getting places...'
      });
      
      await this.placesSvc.getImages();
      this.places=await this.placesSvc.loadPlaces(); 
     
      this.loader.present();
      if(!ww)
      {
        this.places=this.places.filter(i=>{
          let a:any=i;
          let dist=this.placesSvc.getDistanceFromLatLonInKm(a.place.location.lat,a.place.location.lng)
          
          if(a.place.isApproved==true&&a.place.country==this.placesSvc.country&&dist<this.distanation)
          {
            a.place.dist=dist.toFixed();
            return i;
          }
        
        })
    }else
    {
      await firebase.auth().onAuthStateChanged(user=>{
        if(user){
          this.uid=user.uid;
        }
      })
      this.places=this.places.filter(i=>{
        let a:any=i;
        if(a.place.uid==this.uid)
        {
          return i;
        }
      })
      this.isMy=true;
    }
    }catch(err)
    {
      console.log(err)
    }finally
    {
      this.loader.dismiss();
    }
  }

  onOpenPlace(place:Place,index:number){

    const modal=this.modalCtrl.create('PlacePage',{place:place,index:index,is:this.isMy});
    modal.present();
  }
  addPlace()
  {
    this.navCtrl.push('AddPlacePage');
  }


}
