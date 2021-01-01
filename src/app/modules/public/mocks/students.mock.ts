import {Injectable} from "@angular/core";



@Injectable()
export class StudentsMock {
  students = [
    {'isEmployed': true, 'fullName': 'test fullname', 'startDate': 'test startDate', 'endDate': 'test endDate'},
    {'isEmployed': false, 'fullName': 'test fullname', 'startDate': 'test startDate', 'endDate': 'test endDate'},
    {'isEmployed': true, 'fullName': 'test fullname', 'startDate': 'test startDate', 'endDate': 'test endDate'},
    {'isEmployed': false, 'fullName': 'test fullname', 'startDate': 'test startDate', 'endDate': 'test endDate'},
    {'isEmployed': false, 'fullName': 'test fullname', 'startDate': 'test startDate', 'endDate': 'test endDate'}
  ];


  constructor() {
  }
}
