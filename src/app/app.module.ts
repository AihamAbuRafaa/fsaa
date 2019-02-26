import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { AgmCoreModule } from '@agm/core';
import { AngularFireModule } from '@angular/fire';
import {AngularFireDatabaseModule, AngularFireDatabase} from '@angular/fire/database';
import { PlacesProvider } from '../providers/places/places';
import { HttpClientModule } from '@angular/common/http'; 
@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC1AcW_u4SenzWkPprQe4kYuCA3saCUiww'
    }),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDc607f1SpX9XSskVH_MJcvvVzIgzntX30",
      authDomain: "fsaa-738e5.firebaseapp.com",
      databaseURL: "https://fsaa-738e5.firebaseio.com",
      projectId: "fsaa-738e5",
      storageBucket: "",
      messagingSenderId: "629862427374"
    }),
    AngularFireDatabaseModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    PlacesProvider
  ]
})
export class AppModule {}
