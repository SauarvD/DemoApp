import { Component, OnInit, NgZone } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';
declare var gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})

export class LoginComponent implements OnInit {
  public loader: boolean = false;
  public loaded: boolean = false;
  constructor(private authenticationService: AuthService,
              private ngZone: NgZone,
              private router: Router) { 
    window['onSignIn'] = (user) => ngZone.run(() => this.onSignIn(user));
  }

  ngOnInit() {
    if(navigator.geolocation){
      this.getLocation();
    }
  }

  loginLoader(){
    this.loader = true;
    if(navigator.geolocation){
      this.getLocation();
    }
  }

  getLocation(){
    navigator.geolocation.getCurrentPosition(function(pos){
      console.log(pos);
      localStorage.setItem('lat',JSON.parse(JSON.stringify(pos.coords.latitude)));
      localStorage.setItem('long',JSON.parse(JSON.stringify(pos.coords.longitude)));
    });
  }

  onSignIn(googleUser){
    var self=this;
    var profile = googleUser.getBasicProfile();
    if(profile){
      localStorage.setItem('Name',profile.getGivenName());
      localStorage.setItem('Image',profile.getImageUrl());
      localStorage.setItem('Email',profile.getEmail());
      localStorage.setItem('ID',profile.getId());
      this.loaded = true;
      setTimeout(function(){
        self.router.navigate(['/dashboard']);
      },1300)
    }
    // console.log('Full Name: ' + profile.getName());
    // console.log('Family Name: ' + profile.getFamilyName());
  }

}
