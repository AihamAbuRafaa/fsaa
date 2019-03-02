import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapToSearchPage } from './map-to-search';
import { AgmCoreModule } from '@agm/core';
@NgModule({
  declarations: [
    MapToSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(MapToSearchPage),
    AgmCoreModule,
  ],
})
export class MapToSearchPageModule {}
