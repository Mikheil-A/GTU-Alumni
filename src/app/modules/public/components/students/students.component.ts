import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatPaginatorIntl,
  MatSidenav,
  MatSort,
  MatTableDataSource,
} from '@angular/material';
import { AddOrEditSeniorStudentDialogComponent } from '../../../admin/components/dialogs/add-or-edit-senior-student-dialog/add-or-edit-senior-student-dialog.component';
import { ConfirmDeletionDialogComponent } from '../../../shared/components/dialogs/confirm-deletion-dialog/confirm-deletion-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { StudentsMock } from '../../mocks/students.mock';
import { StudentsService } from '../../services/students.service';
import { MatSnackBarService } from '../../../shared/services/mat-snack-bar.service';
import { AuthService } from '../../../auth/services/auth.service';
import { SelectionModel } from '@angular/cdk/collections';
import { SendEmailDialogComponent } from './send-email-dialog/send-email-dialog.component';
import { PageEvent } from '@angular/material/paginator';
import { User } from '../../../auth/components/authentication/sign-in/sign-in.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  providers: [
    // For overwriting/changing default properties of paginator
    // {provide: MatPaginatorIntl, useClass: StudentsComponent}
  ],
})
export class StudentsComponent extends MatPaginatorIntl implements OnInit {
  @ViewChild('sidenav') private _sidenav: MatSidenav;

  sidenavId: number = null;
  clickedStudentId: string;
  clickedStudentInfo: object;
  isAdmin: boolean = false;

  enteredUserId: number;

  admin = false;

  displayedColumns: string[] = [
    'checkboxSelect',
    'employed',
    'full_name',
    'birth_date',
    'apply_date',
    'graduate_date',
    'editAndDeleteIcons',
  ];
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel(true, []);

  // MatPaginator Inputs
  // length = 100;
  // pageSize = 5;
  // pageSizeOptions: number[] = [5, 10, 25, 100];

  gridFilterData: object = {
    // paginator
    // page: 1,
    // limit: 5,

    // sorting
    // property: 'created_at',
    // direction: 'desc', // asc

    is_employed: null, // true/false

    start_date: null, // milliseconds
    end_date: null, // milliseconds

    input: '', // string, searches in full name
  };

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _matDialog: MatDialog,
    private _ngxSpinnerService: NgxSpinnerService,
    private _studentsMock: StudentsMock,
    private _studentsService: StudentsService,
    private _matSnackBarService: MatSnackBarService,
    // private pageEvent: PageEvent,
    public authService: AuthService,
  ) {
    super();
    // this._setPaginatorInGeorgian();
    // this.dataSource = new MatTableDataSource(this._studentsMock.students);
  }

  ngOnInit() {
    this._fetchGridData(this.gridFilterData);
    // this._fetchGridData({});
    this.enteredUserId = parseInt(localStorage.getItem('user_id'), 10);
  }

  private _determineAdmin(): void {
    this.isAdmin = this.authService.isAdmin;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  isDisabled(id) {
    return id === this.enteredUserId;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }

  // private _setPaginatorInGeorgian() {
  //   // Overwriting default properties of paginator
  //   this.itemsPerPageLabel = 'ჩანაწერების რაოდენობა გვერდზე:';
  //   this.nextPageLabel = 'შემდეგი გვერდი';
  //   this.previousPageLabel = 'წინა გვერდი';
  // }

  _fetchGridData(filterByData: object) {
    this._ngxSpinnerService.show();
    filterByData = {
      ...filterByData,
      admin: this.admin,
    };
    this._studentsService.search(filterByData).subscribe(
      (students: any[]) => {
        this.dataSource = new MatTableDataSource(students);
        this.dataSource.sort = this.sort;
        // this.gridFilterData['limit'] = res['data'].limit;
        this._determineAdmin();
      },
      () => {},
      () => {
        setTimeout(() => {
          this._ngxSpinnerService.hide();
        }, 1000);
      },
    );
  }

  openSendEmailDialog() {
    const dialogRef = this._matDialog.open(SendEmailDialogComponent, {
      data: this.selection,
    });

    const sendSubscription = dialogRef.componentInstance.onSend.subscribe(
      () => {
        this._fetchGridData({ property: 'created_at' });
        this._matSnackBarService.openSnackBar(
          'ელ. ფოსტა წარმატებით გაიგზავნა ',
        );
      },
    );

    dialogRef.afterClosed().subscribe(() => {
      sendSubscription.unsubscribe();
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //TODO ურექვესთოდ
  openStudentInfoSideNav(id: string) {
    if (this.authService.isLoggedIn && (this.isDisabled(id) || this.isAdmin)) {
      this.sidenavId = 1;
      this.clickedStudentId = id;
      this._studentsService
        .getStudent(this.clickedStudentId)
        .subscribe((res: User[]) => {
          this.clickedStudentInfo = res[0];
          this._sidenav.open();
        });
    }
  }

  openAddOrEditSeniorStudentDialog(clickedRecordData: object = null) {
    const dialogRef = this._matDialog.open(
      AddOrEditSeniorStudentDialogComponent,
      {
        data: clickedRecordData,
      },
    );
    dialogRef.afterClosed().subscribe((isAdded: boolean) => {
      if (isAdded) {
        // this._fetchGridData(this._gridFilterData);
        this._fetchGridData({});
        this._matSnackBarService.openSnackBar('სტუდენტი წარმატებით შეინახა');
      }
    });
  }

  openConfirmDeletionDialog(studentId: number) {
    const dialogRef = this._matDialog.open(ConfirmDeletionDialogComponent, {
      data: null,
    });

    const deleteSubscription = dialogRef.componentInstance.onDelete.subscribe(
      () => {
        // this._fetchGridData(this._gridFilterData);
        this._studentsService.delete(studentId).subscribe(() => {
          dialogRef.close();
          this._fetchGridData({});
          this._matSnackBarService.openSnackBar('სტუდენტი წარმატებით წაიშალა');
        });
      },
    );

    dialogRef.afterClosed().subscribe((isDeleted: boolean) => {
      // if (isDeleted) {
      //   this._fetchGridData(this._gridFilterData);
      // }
      deleteSubscription.unsubscribe();
    });
  }

  openFilterGridSidenav() {
    this.sidenavId = 2;
    this._sidenav.open();
  }

  reFetchFilteredGrid(e) {
    this._sidenav.close();

    this.gridFilterData['is_employed'] = e.isEmployed;
    this.gridFilterData['start_date'] = e.startDate;
    this.gridFilterData['end_date'] = e.endDate;

    this._fetchGridData(this.gridFilterData);
  }

  /*  onPagingChange(e) {
    this.gridFilterData['page'] = e.pageIndex + 1;

    this.gridFilterData['limit'] = e.pageSize;

    this._fetchGridData(this.gridFilterData); // FIXME backend not working
  }*/

  onTableSort(e) {
    this.gridFilterData['property'] = e.active;
    this.gridFilterData['direction'] = e.direction;

    this._fetchGridData(this.gridFilterData);
  }
}
