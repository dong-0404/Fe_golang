import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.interface';
import { EmployeeService } from '../employee.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees : Employee[] = [];


  constructor(
    private employeeService: EmployeeService,
    private toastr:ToastrService,
    private modalService: NgbModal
  ){}

  ngOnInit(): void {
    this.employeeService.getEmployees()
    .subscribe((employees:any) => {
      this.employees = employees
      console.log(employees)
    })
  }
  openModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    
    if (modal !== null) {
      modal.style.display = 'block';
    }
  }

  closeModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    
    if (modal !== null) {
      modal.style.display = 'none';
    }
  }

  deleteEmployee(id:number): void {
    this.employeeService.deleteEmployee(id)
    .subscribe(() => {
      this.employees = this.employees.filter(employees => employees.ID !== id);
      this.toastr.success('deleted successfully', 'Notice');
      // console.log(this.toastr)
    });
  }
  openEditPopup(id: number): void {
    // const employee = this.employees.find(emp => emp.ID === id);
  
    // if (employee) {
      const modalRef = this.modalService.open(EditEmployeeComponent, {size : 'lg'});
      modalRef.componentInstance.employeeId = id;
    // }
} 
}