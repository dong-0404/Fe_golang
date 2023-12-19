import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employee/employee-detail/employee-detail.component';
import { EditEmployeeComponent } from './employee/edit-employee/edit-employee.component';
import { ListCvComponent } from './managerCV/list-cv/list-cv.component';
import { CvDetailComponent } from './managerCV/cv-detail/cv-detail.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path: 'Admin',component: DashboardComponent,
  children: [
    {path: 'listEmployees',component: EmployeeListComponent},
    {path: 'listCVs',component:ListCvComponent}
  ]
},
  {path: 'editEmployee',component: EditEmployeeComponent},
  {path: 'Employee/:id',component: EmployeeDetailComponent},
  {path: 'Cv/:id',component: CvDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
