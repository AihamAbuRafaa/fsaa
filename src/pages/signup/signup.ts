import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { NgForm } from '@angular/forms';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private authSVC:AuthServiceProvider,
     private loadingCtrl:LoadingController,
     private alerCtrl : AlertController) {
  }


  // register and go to home page
  register(form : NgForm) {
    const loading=this.loadingCtrl.create({
      content:"Signing you up...",
    });
    loading.present();
    this.authSVC.signup(form.value.email,form.value.password).then(
      data=>{
        loading.dismiss();
      })
      .catch(error=>{
        loading.dismiss();
        const alert=this.alerCtrl.create({
          title:'Signup failed ',
          message: error.message,
          buttons:['Ok']
        });
        alert.present();
      });
  }

  // go to login page
  login() {
    this.navCtrl.setRoot('LoginPage');
  }

}
