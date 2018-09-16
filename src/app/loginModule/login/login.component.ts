import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService: AuthService) { 
  	authenticationService.isAuthenticated();
  }

  ngOnInit() {
  }

  callLogin(){
  	this.authenticationService.login();
  }

}
