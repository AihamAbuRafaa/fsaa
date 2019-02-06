import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController, ToastController, LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  constructor(public nav: NavController,
     public forgotCtrl: AlertController,
     private loadingCtrl:LoadingController,
     private authSVC:AuthServiceProvider,
      public menu: MenuController, 
      public toastCtrl: ToastController) {
    this.menu.swipeEnable(false);
  }

  // go to register page
  register() {
    this.nav.setRoot('SignupPage');
  }

  // login and go to home page
  login(form : NgForm) {
    console.log("hi")
    const loading=this.loadingCtrl.create({
      content:"Signing you in...",
    });
    loading.present();
    this.authSVC.signin(form.value.email,form.value.password).then(
      data=>{
        loading.dismiss();
        this.nav.setRoot('HomePage')
      })
      .catch(error=>{
        loading.dismiss();
        const alert=this.forgotCtrl.create({
          title:'Signin failed ',
          message: error.message,
          buttons:['Ok']
        });
        alert.present();
      });
    
  }

  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log(data);
            this.resetPassword(data.email);
            let toast = this.toastCtrl.create({
              message: 'Email was sended successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }
  resetPassword(data:string)
  {
    this.authSVC.resetPassword(data);
  }
  signinWithFacebook(){
    this.authSVC.signinWithFacebook();
  }
}
