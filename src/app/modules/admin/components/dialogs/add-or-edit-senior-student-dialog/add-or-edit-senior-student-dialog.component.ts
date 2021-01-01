import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {StudentsService} from "../../../../public/services/students.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";



@Component({
  selector: 'app-add-or-edit-senior-student-dialog',
  templateUrl: './add-or-edit-senior-student-dialog.component.html',
  styleUrls: ['./add-or-edit-senior-student-dialog.component.scss']
})
export class AddOrEditSeniorStudentDialogComponent implements OnInit {
  addOrEditTitle: string = 'დამატება';
  private _clickedStudentData; // this is assigned to null when dialog is set to adding mode


  formGroup: FormGroup;
  private _inputFieldsInitialValues = {
    'name': null, // first name
    'last_name': null,
    'email': null,
    'birth_date': null,
    'apply_date': null,
    'graduate_date': null,
    'profile_id': 1,
    'employed': false
  };


  constructor(private _studentsService: StudentsService,
              private _matDialogRef: MatDialogRef<AddOrEditSeniorStudentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private _receivedData: any) {
    this._clickedStudentData = this._receivedData;
  }

  ngOnInit() {
    if (this._clickedStudentData) {
      this._setDialogToEditingMode();
    }
    this._initializeForm();
  }


  private _setDialogToEditingMode() {
    this.addOrEditTitle = 'ჩასწორება';

    // Setting clicked record values to input fields
    this._inputFieldsInitialValues.name = this._clickedStudentData.name;
    this._inputFieldsInitialValues.last_name = this._clickedStudentData.last_name;
    this._inputFieldsInitialValues.email = this._clickedStudentData.email;
    this._inputFieldsInitialValues.birth_date = this._clickedStudentData.birth_date;
    this._inputFieldsInitialValues.apply_date = this._clickedStudentData.apply_date;
    this._inputFieldsInitialValues.graduate_date = this._clickedStudentData.graduate_date;
    this._inputFieldsInitialValues.profile_id = this._clickedStudentData.profile_id;
    this._inputFieldsInitialValues.employed = this._clickedStudentData.employed;
  }

  private _initializeForm() {
    this.formGroup = new FormGroup({
      'name': new FormControl(this._inputFieldsInitialValues.name, Validators.required),
      'last_name': new FormControl(this._inputFieldsInitialValues.last_name, Validators.required),
      'email': new FormControl(this._inputFieldsInitialValues.email, [Validators.required, Validators.email]),
      'birth_date': new FormControl(this._inputFieldsInitialValues.birth_date, Validators.required),
      'apply_date': new FormControl(this._inputFieldsInitialValues.apply_date, Validators.required),
      'graduate_date': new FormControl(this._inputFieldsInitialValues.graduate_date, Validators.required),
      'profile_id': new FormControl(this._inputFieldsInitialValues.profile_id, Validators.required),
      'employed': new FormControl(this._inputFieldsInitialValues.employed), // 1 student, 2 - admin
    });
  }

  closeDialog(wasAStudentAdded: boolean) {
    this._matDialogRef.close(wasAStudentAdded);
  }

  save() {
    const tempRequestData = {
      "email": "dunkman032@gmail.com",
      "name": "zuri123",
      "last_name": "123",
      "username": "zuria12",
      "birth_date": "25-01-1997",
      "profile_id": 1,
      'apply_date': new Date(),
      'graduate_date': new Date(),
      'employed': true
    };

    // this._studentsService.addOrUpdate(tempRequestData).subscribe((res) => {
    //   this.closeDialog(true);
    // });

    if (this.formGroup.valid) {
      let requestData = this.formGroup.value;
      requestData ['username'] = this.formGroup.value.email.substring(0, this.formGroup.value.email.indexOf('@'));

      if (this._clickedStudentData) {
        // if the dialog is in editing mode
        requestData['id'] = this._clickedStudentData.id;
        this._studentsService.update(requestData).subscribe(() => {
          this.closeDialog(true);
        });
      } else {
        this._studentsService.add(requestData).subscribe(() => {
          this.closeDialog(true);
        });
      }
    }
  }
}
