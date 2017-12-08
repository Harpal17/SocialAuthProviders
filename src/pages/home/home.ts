import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';
import { Facebook} from "@ionic-native/facebook";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  email: any;
  password: any;

  constructor(public navCtrl: NavController, public googleplus: GooglePlus, public facebook: Facebook) {

  }

  login(){
    this.googleplus.login({
      'webClientId': '872005864981-t0ge5031mkl4dutear8i744ra68uhkl4.apps.googleusercontent.com',
      'offline': true
    }).then(res=>{
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
        .then(suc=>{
          alert("Login success")
        }).catch(ns=>{
          alert("Not success")
      })
    })
  }

  loginWithFb(){
    this.facebook.login(['email']).then(res=>{
          const fc= firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken)
          firebase.auth().signInWithCredential(fc).then(fbsuc=>{
            alert("FB login success")
          }).catch(fbns=>{
            alert("Not Success")
          })
    }).catch(err=>{
      alert(JSON.stringify(err))
    })
  }
}
