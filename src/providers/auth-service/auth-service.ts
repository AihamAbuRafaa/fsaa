import { Injectable } from '@angular/core';
import firebase from 'firebase'

@Injectable()
export class AuthServiceProvider {
  name:string;
  constructor() {
    
  }

  signup(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  signin(email:string,password:string){
    return firebase.auth().signInWithEmailAndPassword(email,password);
  }

  logout(){
    firebase.auth().signOut();
  }

  signinWithFacebook(){
    let provider=new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithRedirect(provider).then(()=>{
      firebase.auth().getRedirectResult().then((result)=>{
        alert(JSON.stringify(result));

      }).catch(function(error){
        alert(JSON.stringify(error))
      })
    })
  }
  resetPassword(email:string){
    return firebase.auth().sendPasswordResetEmail(email);
  }

}
