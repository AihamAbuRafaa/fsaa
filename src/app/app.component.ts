import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'LoginPage';
  homepage:any='HomePage'
  signinpage : any ='SigninPage'
  isAuthenticated =false;
  @ViewChild(Nav) nav: Nav;
  constructor(platform: Platform,
     statusBar: StatusBar, 
     private authSVC : AuthServiceProvider,
     splashScreen: SplashScreen,
     ) {
    firebase.initializeApp({
      apiKey: "AIzaSyDc607f1SpX9XSskVH_MJcvvVzIgzntX30",
      authDomain: "fsaa-738e5.firebaseapp.com",
      databaseURL: "https://fsaa-738e5.firebaseio.com",
      projectId: "fsaa-738e5",
      storageBucket: "fsaa-738e5.appspot.com",
      messagingSenderId: "629862427374"
    });
    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        this.isAuthenticated=true;
        this.rootPage='HomePage';
      }
      else
      {
        this.isAuthenticated=false;
        this.rootPage='LoginPage';
      }
    })
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    
  }
  logout(){
    this.authSVC.logout();
    this.nav.setRoot('LoginPage')
  }
}
