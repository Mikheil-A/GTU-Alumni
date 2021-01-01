import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { StudentsService } from '../../../public/services/students.service';
import { User } from '../../../auth/components/authentication/sign-in/sign-in.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements OnInit {
  studentId: string;
  studentInfo: object;
  canEditTheProfile: boolean = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _ngxSpinnerService: NgxSpinnerService,
    private _studentsService: StudentsService,
  ) {
    this._getStudentId();
  }

  ngOnInit() {
    // a user can only edit their profile
    this.canEditTheProfile =
      this.studentId === JSON.parse(localStorage.getItem('user')).id;
    this.fetchStudentInfo(this.studentId);
  }

  private _getStudentId() {
    this.studentId = this._activatedRoute.snapshot.paramMap.get('id');
  }

  fetchStudentInfo(id: string) {
    this._ngxSpinnerService.show();

    this._studentsService.getStudent(id).subscribe(
      (res: User[]) => {
        if (res.length) {
          this.studentInfo = res[0];
          console.log('this.studentInfo', this.studentInfo);
        }
      },
      (err) => {
        console.log(err);
      },
      () => {
        setTimeout(() => {
          this._ngxSpinnerService.hide();
        }, 1000);
      },
    );
  }
}
