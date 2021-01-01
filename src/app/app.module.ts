import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';

import {AuthModule} from "./modules/auth/auth.module";
import {AdminModule} from "./modules/admin/admin.module";
import {PublicModule} from "./modules/public/public.module";
import {SharedModule} from "./modules/shared/shared.module";



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    AuthModule,
    AdminModule,
    PublicModule,
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
