import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoodToKnowPage } from './good-to-know';

@NgModule({
  declarations: [
    GoodToKnowPage,
  ],
  imports: [
    IonicPageModule.forChild(GoodToKnowPage),
  ],
})
export class GoodToKnowPageModule {}
