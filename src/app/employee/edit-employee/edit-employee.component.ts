import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../employee.interface';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  updateEmployee: Employee | undefined;
  @Input() employeeId!: number;
  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _NgbActiveModal: NgbActiveModal
  ) {
    this.employeeForm = this.fb.group({
      dataEmployee: this.fb.group({
        full_name: [''],
        email: ['', [Validators.email]],
        phone: ['', [Validators.maxLength(11)]],
        address: [''],
        job_type: [''],
      }),
      dataEmployeeDocs: this.fb.group({
        id_card: [''],
        bank_account: [''],
        joining_date: ['']
      })
    });
  }

  ngOnInit(): void {
    if (!isNaN(this.employeeId)) {
      this.employeeService.getEmployeeById(this.employeeId).subscribe((employee:any) => {
        this.updateEmployee = employee.data;
        // console.log kiem tra kieu du lieu
        // console.log(this.employeeForm);
        //kiem tra data output
        // console.log("eee", this.updateEmployee);
      
        this.employeeForm.controls["dataEmployee"].patchValue(this.updateEmployee)
        this.employeeForm.controls["dataEmployeeDocs"].patchValue(this.updateEmployee?.EmployeeDocs)
      })
    }
  }

  get activeModal() {
    return this._NgbActiveModal.dismiss();
  }

  onSubmit(): void {
    // console.log(this.employeeForm);

    if (this.employeeForm.invalid) {
      return;
    }
    const updateEmployeeData = this.employeeForm.value;
    console.log(updateEmployeeData)
    this.employeeService.updateEmployee(this.employeeId, updateEmployeeData).subscribe(response => {
      console.log(response)
      this.toastr.success("update new info employe", "Notice");
      setTimeout(() => {
        location.reload();
      }, 500);
    })
  }
}
