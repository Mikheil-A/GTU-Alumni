import {NgModule} from '@angular/core';

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from "@angular/material";
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {MAT_DATE_LOCALE} from "@angular/material/core";



@NgModule({
  declarations: [],
  imports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSidenavModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSelectModule,
    MatMenuModule,
    MatSnackBarModule,
    MatExpansionModule,
    DragDropModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSidenavModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSelectModule,
    MatMenuModule,
    MatSnackBarModule,
    MatExpansionModule,
    DragDropModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
  ]
})
export class MatModule {
}
