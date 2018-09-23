import { Component, OnInit, NgZone } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { Router } from '@angular/router';
declare var gapi: any;
@Component({
  selector: 'app-postLogin',
  templateUrl: './postLogin.component.html',
  styleUrls: ['./postLogin.component.css']
})
export class postLoginComponent implements OnInit {

  constructor(private router: Router,
              private ngZone: NgZone,
              private authenticationService: AuthService) { 
  }

  public profile: any = {};
  public linkToRoute: any = [];

  ngOnInit() {
    this.profile['image'] = localStorage.getItem('Image');
    this.profile['name'] = localStorage.getItem('Name');
    this.linkToRoute = [
      {
        linkName:'FoodPoll',
        url:'foodPoll'
      },
      {
        linkName:'Search People',
        url:'searchPeople'
      }
    ]
  }

  signout(){
    localStorage.clear();
    let self=this
    gapi.load('auth2', function () {
        var auth2 = gapi.auth2.init({
            client_id: '292747500846-rvhar8jo5sr536kkap5seadjqdi0sbj5.apps.googleusercontent.com'
        })
        auth2.then(function (){
          auth2.signOut();
          self.router.navigate(['/home']);
        });
    });
  }

  navigateTo(){
    this.router.navigate(['/dashboard/foodPoll'])
  }

  navigateTois(){
    this.router.navigate(['/dashboard/searchPeople'])
  }

}
