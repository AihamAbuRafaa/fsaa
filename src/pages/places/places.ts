import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Modal, LoadingController, SelectPopover } from 'ionic-angular';
import { AddPlacePage } from '../add-place/add-place';
import { Place } from '../../models/place';
import { PlacePage } from '../place/place';
import { PlacesProvider } from '../../providers/places/places';
import { CATCH_STACK_VAR, ThrowStmt } from '@angular/compiler/src/output/output_ast';

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
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private placesSvc:PlacesProvider,
     private modalCtrl : ModalController,
     private loadingCtrl:LoadingController,) {

  }
  async ngOnInit(){
    try{
      this.loader = this.loadingCtrl.create({
        content:'Getting places...'
      });
      this.loader.present();
      await this.placesSvc.getImages();
      this.places=await this.placesSvc.loadPlaces(); 
      console.log(this.places)
    }catch(err)
    {
      console.log(err)
    }finally
    {
      this.loader.dismiss();
    }
  }

  onOpenPlace(place:Place,index:number){
    const modal=this.modalCtrl.create('PlacePage',{place:place,index:index});
    modal.present();
  }
  addPlace()
  {
    this.navCtrl.push('AddPlacePage');
  }

}
