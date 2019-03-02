import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchNextToYouPage } from './search-next-to-you';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    SearchNextToYouPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchNextToYouPage),
    AgmCoreModule,
  ],
})
export class SearchNextToYouPageModule {}
