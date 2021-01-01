import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatSnackBarService } from '../../../../shared/services/mat-snack-bar.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { StudentsService } from '../../../../public/services/students.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-hobbies',
  templateUrl: './hobbies.component.html',
  styleUrls: ['./hobbies.component.scss'],
})
export class HobbiesComponent implements OnChanges {
  @Input() canEdit: boolean;
  @Input() hobbiesStr: string;
  hobbiesArr: string[] = [];
  aNewHobby: string = '';

  @Output() onHobbiesChange = new EventEmitter<any>();

  constructor(
    private _matSnackBarService: MatSnackBarService,
    private _studentsService: StudentsService,
    private _ngxSpinnerService: NgxSpinnerService,
    private _authService: AuthService,
  ) {}

  ngOnChanges() {
    // assign hobbies array
    if (this.hobbiesStr) {
      this.hobbiesArr = this.hobbiesStr.split(',');
    }
  }

  private get _getRequestData(): object {
    this._ngxSpinnerService.show();
    return {
      user_id: this._authService.getLoggedInUser.id,
      hobby: this.hobbiesArr.toString(),
    };
  }

  private _sendRequest(actionMessage: string): void {
    this._studentsService.modifyHobbies(this._getRequestData).subscribe(() => {
      this.onHobbiesChange.emit();
      this._matSnackBarService.openSnackBar(actionMessage);
      setTimeout(() => {
        this._ngxSpinnerService.hide();
      }, 500);
    });
  }

  onDragAndDrop(event: CdkDragDrop<string[]>): void {
    if (!this.canEdit) {
      return;
    }
    moveItemInArray(this.hobbiesArr, event.previousIndex, event.currentIndex);
    this._sendRequest('ჰობის ცვლილება შეინახა');
  }

  addHobby(): void {
    if (!this.aNewHobby && !this.canEdit) {
      return;
    }
    this.hobbiesArr.push(this.aNewHobby);
    this.aNewHobby = '';

    this._sendRequest('ახალი ჰობი დაემატა');
  }

  removeClickedHobby(index: number): void {
    if (!this.canEdit) {
      return;
    }
    this.hobbiesArr.splice(index, 1);
    this._sendRequest('ჰობი ამოიშალა');
  }
}
