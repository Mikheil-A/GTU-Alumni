import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-student-info-sidenav',
  templateUrl: './student-info-sidenav.component.html',
  styleUrls: ['./student-info-sidenav.component.scss'],
})
export class StudentInfoSidenavComponent implements OnChanges {
  @Input() studentId: string;
  @Input() studentInfo: string;

  // studentInfo: object;

  constructor() {}

  ngOnChanges() {
    // this._fetchStudent();
  }

  // private _fetchStudent() {
  //   this._studentsService.getStudent(this.studentId).subscribe(res => {
  //     this.studentInfo = res['data'];
  //     console.log(this.studentInfo);
  //   });
  // }
}
