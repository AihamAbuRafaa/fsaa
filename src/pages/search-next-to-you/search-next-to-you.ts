import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the SearchNextToYouPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-next-to-you',
  templateUrl: 'search-next-to-you.html',
})
export class SearchNextToYouPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
     ) {
  }

  ionViewDidLoad() {

  }

  search(event : any , what:string ){
    this.navCtrl.push('MapToSearchPage',{
      what:what
    });
  }
}
