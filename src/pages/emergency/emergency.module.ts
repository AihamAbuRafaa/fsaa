import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmergencyPage } from './emergency';
import { CallNumber } from 'ionic-native';

@NgModule({
  declarations: [
    EmergencyPage,
  ],
  imports: [
    IonicPageModule.forChild(EmergencyPage),

  ],
  providers:[
    CallNumber
  ]
})
export class EmergencyPageModule {}
