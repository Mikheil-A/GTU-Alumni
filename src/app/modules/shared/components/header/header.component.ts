import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { StudentsService } from '../../../public/services/students.service';
import { MatDialog } from '@angular/material';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';
import { MatSnackBarService } from '../../services/mat-snack-bar.service';
import { User } from '../../../auth/components/authentication/sign-in/sign-in.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  loggedInUserData: any;

  constructor(
    private _authService: AuthService,
    private _studentsService: StudentsService,
    private _matDialog: MatDialog,
    private _matSnackBarService: MatSnackBarService,
  ) {}

  ngOnInit() {
    if (this._authService.isLoggedIn) {
      this._getLoggedInUserData();
    }
  }

  private _getLoggedInUserData() {
    this.loggedInUserData = this._authService.getLoggedInUser;
  }

  logout() {
    this._authService.logout();
  }

  openChangePasswordDialog() {
    const dialogRef = this._matDialog.open(ChangePasswordDialogComponent);

    const passwordChangeSubscription = dialogRef.componentInstance.onPasswordChange.subscribe(
      () => {
        this._matSnackBarService.openSnackBar('პაროლი წარმატებით შეიცვალა');
      },
    );
    dialogRef.afterClosed().subscribe(() => {
      passwordChangeSubscription.unsubscribe();
    });
  }
}
