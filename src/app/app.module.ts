import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateEmployeeComponent } from './employee/create-employee/create-employee.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EditEmployeeComponent } from './employee/edit-employee/edit-employee.component';
import { CreateCvComponent } from './managerCV/create-cv/create-cv.component';
import { ListCvComponent } from './managerCV/list-cv/list-cv.component';
import { EditCvComponent } from './managerCV/edit-cv/edit-cv.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { EmployeeDetailComponent } from './employee/employee-detail/employee-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CvDetailComponent } from './managerCV/cv-detail/cv-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateEmployeeComponent,
    EmployeeListComponent,
    EditEmployeeComponent,
    CreateCvComponent,
    ListCvComponent,
    EditCvComponent,
    LoginComponent,
    RegisterComponent,
    EditUserComponent,
    DashboardComponent,
    EmployeeDetailComponent,
    CvDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      progressBar: true,
      progressAnimation: "increasing",
      preventDuplicates: true
    }),
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [ToastrService,NgbActiveModal],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
