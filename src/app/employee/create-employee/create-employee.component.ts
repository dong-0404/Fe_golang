import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit{
  employeeForm!: FormGroup;

  formErrors : {[key:string]:any}= {
    'full_name': '',
    'email': '',
    'phone': '',
    'address': '',  
    'job_type': '',
    'id_card': '',
    'bank_account': '',
    'bank_account_info': '',
    'joining_date': ''
  };
  
  validationMessages : {[key:string]:any} = {
    'full_name': {
      'required': 'Full Name is required.',
      'minlength': 'Full Name must be greater than 2 characters.',
      'maxlength': 'Full Name must be less than 10 characters.'
    },
    'email': {
      'required': 'Email is required.'
    },
    'phone': {
      'required': 'phone is required.',
    },
    'address': {
      'required': 'address is required.',
    },
    'job_type': {
      'required': 'job_type is required.',
    },
    'id_card': {
      'required': 'id_card is required.',
    },
    'bank_account': {
      'required': 'bank_account is required.',
    },
    'bank_account_info': {
      'required': 'bank_account_info is required.',
    },
    'joining_date': {
      'required': 'joining_date is required.',
    },
  };

  constructor(
    private fb:FormBuilder,
    private employeeService:EmployeeService,
    private toarst: ToastrService
    ){}

    ngOnInit():void {
      this.employeeForm = this.fb.group({
        full_name: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(10)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.maxLength(11)]],
        address: ['', [Validators.required]],
        job_type: ['', [Validators.required]],
        employeeDocs: this.fb.group({
          id_card: ['', [Validators.required]],
          bank_account: ['', [Validators.required]],
          bank_account_info: ['', [Validators.required]],
          joining_date: ['', [Validators.required]]
        })
      } );
      this.employeeForm.valueChanges.subscribe((data) => {
        this.logValidationError(this.employeeForm)
      })
    }

    onSubmit(): void{
      if(this.employeeForm.invalid) {
        return;
      }
      const employeeData = this.employeeForm.value;
      console.log(employeeData);

      this.employeeService.createEmployee(employeeData).
      subscribe((response) =>{
        console.log(response);
      this.toarst.success('Created Successfully', 'Notice!');
      setTimeout(()=> {
        location.reload();
      }, 1000);
      },
      (error) => {
        this.toarst.error('Can not creat new user', 'Error');
        setTimeout(() => {
        location.reload();
      }, 2000);
      })
    }

    logValidationError(group: FormGroup = this.employeeForm):void {
      Object.keys(group.controls).forEach((key : string) => {
        const abstractControl = group.get(key);
// kiem tra abstractControl co phai la 1 the hien cua group khong
        if(abstractControl instanceof FormGroup) {
          this.logValidationError(abstractControl);
        } else {
          this.formErrors[key] = '';
          if(abstractControl && !abstractControl.valid && 
            (abstractControl.touched || abstractControl.dirty)) {
            const message = this.validationMessages[key];

            for(const errorKey in abstractControl.errors) {
              if (errorKey) {
                this.formErrors[key] += message[errorKey] + ' ';
              }
            }
          }
        }
      }) 
    }
    // dataOnCick(): void{
    //   console.log(this.logValidationError(this.employeeForm));
    //   console.log(this.formErrors);
    // }
}
