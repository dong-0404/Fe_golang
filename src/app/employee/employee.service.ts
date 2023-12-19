import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee.interface';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:8080/v1/api/employee';

  constructor(private http: HttpClient) { }

  getEmployees():Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}`);
  } 

  getEmployeeById(id:number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }
  
  createEmployee(employeeData: any):Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/create`,employeeData);
  }

  updateEmployee(id:number,updateEmployeeData:any):Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/update/${id}`,updateEmployeeData)
  }

  deleteEmployee(id:number):Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`)
  }
}
