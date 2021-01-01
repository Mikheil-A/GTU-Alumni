import {NgModule} from '@angular/core';
import {AdminRoutingModule} from "./admin-routing.module";

// components
import {StudentComponent} from "./components/student/student.component";
import {WorkExperienceComponent} from './components/student/work-experience/work-experience.component';
import {PersonalInfoComponent} from './components/student/personal-info/personal-info.component';
import {HobbiesComponent} from './components/student/hobbies/hobbies.component';

// dialogs
import {AddOrEditWorkExperienceDialogComponent} from './components/student/work-experience/add-or-edit-work-experience-dialog/add-or-edit-work-experience-dialog.component';

// modules
import {SharedModule} from "../shared/shared.module";

// guards
import {AdminGuard} from "./guards/admin.guard";

import {MatGridListModule} from '@angular/material';



@NgModule({
  declarations: [
    // components
    StudentComponent,
    WorkExperienceComponent,
    PersonalInfoComponent,
    HobbiesComponent,

    // dialogs
    AddOrEditWorkExperienceDialogComponent
  ],
  imports: [
    AdminRoutingModule,
    MatGridListModule,
    SharedModule
  ],
  providers: [
    // guards
    AdminGuard
  ],
  entryComponents: [
    AddOrEditWorkExperienceDialogComponent
  ]
})
export class AdminModule {
}
