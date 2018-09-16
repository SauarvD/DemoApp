import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {JwtModule} from '@auth0/angular-jwt';
import {AuthService} from '../services/auth.service';

import {LoginComponent} from './login/login.component';
import { LoginModuleRoutingModule } from './loginModule.routing.module';

@NgModule({
  imports: [
    CommonModule, LoginModuleRoutingModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [JwtModule, AuthService]
})
export class LoginModule { }
