import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    audience: 'https://eventscheduler.auth0.com/userinfo',
    clientID: 'MoccJt2iH2aiANxIR3bwTGOL7paFkCHe',
    domain: 'eventscheduler.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid profile'
  });

  constructor(public router: Router) {}

  public userProfile;
  public loggedIn : boolean = false;

  public login(): void {
    this.auth0.authorize();
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(){
    const token = localStorage.getItem('ID');
    return Boolean(token)
  }

}