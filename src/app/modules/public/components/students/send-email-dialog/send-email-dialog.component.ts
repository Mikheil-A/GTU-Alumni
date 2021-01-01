import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {StudentsService} from "../../../services/students.service";



@Component({
  selector: 'app-send-email-dialog',
  templateUrl: './send-email-dialog.component.html',
  styleUrls: ['./send-email-dialog.component.scss']
})
export class SendEmailDialogComponent implements OnInit {
  onSend = new EventEmitter();

  sendEmailFormGroup: FormGroup;


  constructor(private _matDialogRef: MatDialogRef<SendEmailDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private _receivedData: any,
              private _studentsService: StudentsService) {
  }

  ngOnInit() {
    this._initializeForm();
  }


  private _initializeForm() {
    this.sendEmailFormGroup = new FormGroup({
      'subject': new FormControl(null, Validators.required),
      'body': new FormControl(null, Validators.required),
    });
  }

  send() {
    let ids: number[] = [];
    this._receivedData.selected.forEach((item) => {
      ids.push(item.id);
    });

    const reqData: object = this.sendEmailFormGroup.value;
    reqData['ids'] = ids;
    this._studentsService.sendMail(reqData).subscribe(() => {
      this.onSend.emit();
      this._matDialogRef.close();
    })
  }
}
