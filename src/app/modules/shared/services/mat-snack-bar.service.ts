import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material";



@Injectable()
export class MatSnackBarService {

  constructor(private _matSnackBar: MatSnackBar) {
  }


  openSnackBar(message: string) {
    this._matSnackBar.open(message, 'გათიშვა', {
      duration: 2000
    });
  }
}
