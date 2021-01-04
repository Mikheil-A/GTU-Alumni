import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter-grid-sidenav',
  templateUrl: './filter-grid-sidenav.component.html',
  styleUrls: ['./filter-grid-sidenav.component.scss'],
})
export class FilterGridSidenavComponent implements OnInit {
  @Output() onFilter = new EventEmitter<object>();

  filterDataFormGroup: FormGroup;

  constructor() {}

  ngOnInit() {
    this._initializeForm();
  }

  private _initializeForm() {
    this.filterDataFormGroup = new FormGroup({
      startDate: new FormControl(null),
      endDate: new FormControl(null),
      isEmployed: new FormControl(null),
    });
  }

  clearForm() {
    this.filterDataFormGroup.reset();
  }

  load() {
    if (this.filterDataFormGroup.touched && this.filterDataFormGroup.valid) {
      this.onFilter.emit(this.filterDataFormGroup.value);
    }
  }
}
