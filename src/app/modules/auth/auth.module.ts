import {NgModule} from '@angular/core';

import {AuthRoutingModule} from "./auth-routing.module";
import {SharedModule} from "../shared/shared.module";

// components
import {AuthenticationComponent} from "./components/authentication/authentication.component";
import {SignInComponent} from "./components/authentication/sign-in/sign-in.component";

// services
import {AuthService} from "./services/auth.service";

// guards
import {AuthGuard} from "./guards/auth.guard";



@NgModule({
  declarations: [
    // components
    AuthenticationComponent,
    SignInComponent,
  ],
  imports: [
    AuthRoutingModule,
    SharedModule
  ],
  providers: [
    // services
    AuthService,

    // guards
    AuthGuard
  ]
})
export class AuthModule {
}
