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
  constructor(private authenticationService: AuthService,
              private ngZone: NgZone,
              private router: Router) { 
    window['onSignIn'] = (user) => ngZone.run(() => this.onSignIn(user));
  }

  ngOnInit() {
  }

  loginLoader(){
    this.loader = true;
  }

  onSignIn(googleUser){
    var profile = googleUser.getBasicProfile();
    if(profile){
      localStorage.setItem('Name',profile.getGivenName());
      localStorage.setItem('Image',profile.getImageUrl());
      localStorage.setItem('Email',profile.getEmail());
      localStorage.setItem('ID',profile.getId());
      this.router.navigate(['/dashboard']);
    }
    // console.log('Full Name: ' + profile.getName());
    // console.log('Family Name: ' + profile.getFamilyName());
  }

}
