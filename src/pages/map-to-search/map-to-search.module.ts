import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapToSearchPage } from './map-to-search';
import { AgmCoreModule } from '@agm/core';
import { Geolocation } from '@ionic-native/geolocation' ;
@NgModule({
  declarations: [
    MapToSearchPage,
    
  ],
  imports: [
    IonicPageModule.forChild(MapToSearchPage),
    AgmCoreModule,
  ],
  providers:[
    Geolocation,
  ]
})
export class MapToSearchPageModule {}
