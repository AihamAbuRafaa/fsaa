import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Modal, LoadingController, SelectPopover } from 'ionic-angular';
import { AddPlacePage } from '../add-place/add-place';
import { Place } from '../../models/place';
import { PlacesProvider } from '../../providers/places/places';
import firebase from 'firebase'

/**
 * Generated class for the PlacesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-places',
  templateUrl: 'places.html',
})
export class PlacesPage implements OnInit{
  addPlacePage=AddPlacePage;
  places:Place[]=[];
  loader :any;
  isMy:boolean=false;
  uid:string;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private placesSvc:PlacesProvider,
     private modalCtrl : ModalController,
     private loadingCtrl:LoadingController,) {

  }
  async ngOnInit(){
    try{
      let ww=this.navParams.get('i');
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
          if(a.place.isApproved==true&&a.place.country==this.placesSvc.country)
          {
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
