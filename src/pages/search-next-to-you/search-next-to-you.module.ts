import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchNextToYouPage } from './search-next-to-you';

@NgModule({
  declarations: [
    SearchNextToYouPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchNextToYouPage),
  ],
})
export class SearchNextToYouPageModule {}
