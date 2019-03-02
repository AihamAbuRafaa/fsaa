import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlacesNextMePage } from './places-next-me';

@NgModule({
  declarations: [
    PlacesNextMePage,
  ],
  imports: [
    IonicPageModule.forChild(PlacesNextMePage),
  ],
})
export class PlacesNextMePageModule {}
