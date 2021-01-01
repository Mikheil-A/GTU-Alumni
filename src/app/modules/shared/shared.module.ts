import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';

import {MatSnackBarService} from "./services/mat-snack-bar.service";

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptor} from "./interceptors/token.interceptor";

import {PageEvent} from "@angular/material";

// components
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from './components/footer/footer.component';

// dialog components
import {ChangePasswordDialogComponent} from './components/header/change-password-dialog/change-password-dialog.component';
import {ConfirmDeletionDialogComponent} from "./components/dialogs/confirm-deletion-dialog/confirm-deletion-dialog.component";

import {MatModule} from "../mat/mat.module";
import {NgxSpinnerModule} from "ngx-spinner";


@NgModule({
  declarations: [
    // components
    HeaderComponent,
    FooterComponent,

    // dialog components
    ChangePasswordDialogComponent,
    ConfirmDeletionDialogComponent
  ],
  entryComponents: [
    // dialog components
    ChangePasswordDialogComponent,
    ConfirmDeletionDialogComponent
  ],
  imports: [
    // modules
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    BrowserModule,
    HttpClientModule,
    MatModule,
    NgxSpinnerModule,
  ],
  exports: [
    // modules
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    BrowserModule,
    HttpClientModule,
    MatModule,
    NgxSpinnerModule,

    // components
    HeaderComponent,
    FooterComponent
  ],
  providers: [
    // Passing authorization token into every HttpClient request vie HttpOptions headers
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    PageEvent,
    MatSnackBarService
  ]
})
export class SharedModule {
}
