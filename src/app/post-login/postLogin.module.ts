import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {JwtModule} from '@auth0/angular-jwt';
import {AuthService} from '../services/auth.service';

import {HomepageComponent} from './homepage/homepage.component';
import {CallbackComponent} from './callback/callback.component';
import { postLoginModuleRoutingModule } from './postLogin.routing.module';

@NgModule({
  imports: [
    CommonModule, postLoginModuleRoutingModule
  ],
  declarations: [
    HomepageComponent, CallbackComponent
  ],
  providers: [JwtModule, AuthService]
})
export class PostLoginModule { }
