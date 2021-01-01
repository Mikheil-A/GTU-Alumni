import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationComponent } from './components/authentication/authentication.component';
import { SignInComponent } from './components/authentication/sign-in/sign-in.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    // path: 'auth', component: AuthenticationComponent, canActivateChild: [AuthGuard],
    path: 'auth',
    component: AuthenticationComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'sign-in' },
      { path: 'sign-in', component: SignInComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
