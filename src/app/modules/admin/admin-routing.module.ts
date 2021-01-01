import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// components
import {StudentComponent} from "./components/student/student.component";

// guards
import {AdminGuard} from "./guards/admin.guard";



const routes: Routes = [
  // {path: 'student/:id', component: StudentComponent, canActivate: [AdminGuard]}
  {path: 'student/:id', component: StudentComponent}
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
