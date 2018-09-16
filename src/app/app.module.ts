import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes, RouterLink, RouterLinkActive} from '@angular/router';
import { AppComponent } from './app.component';

/* Feature modules */
import { LoginModule } from './loginModule/loginModule.module';
import { AppRoutingModule } from "./app-routing.module";
import { PostLoginModule } from './post-login/postLogin.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    AppRoutingModule,
    LoginModule,
    PostLoginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
