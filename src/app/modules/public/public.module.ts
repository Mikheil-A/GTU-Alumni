import {NgModule} from '@angular/core';

import {PublicRoutingModule} from "./public-routing.module";
import {SharedModule} from "../shared/shared.module";

// components
import {StudentsComponent} from "./components/students/students.component";

// dialog components
import {AddOrEditSeniorStudentDialogComponent} from "../admin/components/dialogs/add-or-edit-senior-student-dialog/add-or-edit-senior-student-dialog.component";
import { SendEmailDialogComponent } from './components/students/send-email-dialog/send-email-dialog.component';

// sidenavs
import {StudentInfoSidenavComponent} from "../admin/components/sidenavs/student-info-sidenav/student-info-sidenav.component";
import {FilterGridSidenavComponent} from "./components/sidenavs/filter-grid-sidenav/filter-grid-sidenav.component";

// mocks
import {StudentsMock} from "./mocks/students.mock";

// services
import {StudentsService} from "./services/students.service";



@NgModule({
  declarations: [
    // components
    StudentsComponent,

    // dialog components
    AddOrEditSeniorStudentDialogComponent,
    SendEmailDialogComponent,

    // sidenavs
    StudentInfoSidenavComponent,
    FilterGridSidenavComponent
  ],
  providers: [
    // mocks
    StudentsMock,

    // services
    StudentsService
  ],
  imports: [
    PublicRoutingModule,
    SharedModule
  ],
  entryComponents: [
    // dialog components
    AddOrEditSeniorStudentDialogComponent,
    SendEmailDialogComponent
  ],
})
export class PublicModule {
}
