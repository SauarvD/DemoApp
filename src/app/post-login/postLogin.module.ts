import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {JwtModule} from '@auth0/angular-jwt';
import {AuthService} from '../services/auth.service';
import {LocationService} from '../services/location.service';
import { FormsModule } from '@angular/forms';

import {postLoginComponent} from './postLogin.component';
import { foodPollComponent } from '../modules/foodPoll/foodPoll.component';
import { SearchPeopleComponent } from '../modules/search-people/search-people.component';
import { ListComponent } from '../modules/list/list.component';
import { postLoginModuleRoutingModule } from './postLogin.routing.module';
import {AuthGuard} from '../services/authGuard.service';

@NgModule({
  imports: [
    CommonModule, postLoginModuleRoutingModule, FormsModule
  ],
  declarations: [
    postLoginComponent,
    foodPollComponent,
    SearchPeopleComponent,
    ListComponent
  ],
  providers: [JwtModule, AuthService, AuthGuard, LocationService]
})
export class PostLoginModule { }
