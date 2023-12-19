import { Component } from '@angular/core';
import { Employee } from '../employee.interface';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent {
  employee: Employee | undefined;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
    ) {}

    ngOnInit() :void {
      this.route.paramMap.subscribe(params => {
        const employeeId = parseInt(params.get('id') || '', 10);
        if(!isNaN(employeeId)) {
          this.employeeService.getEmployeeById(employeeId).subscribe((employee:any) =>{
            this.employee = employee.data;
            console.log(this.employee)
          })
        }
      })
    }
}
