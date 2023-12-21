import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cv } from './cv.interface';
import { Observable } from 'rxjs';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ManagerCvServiceService {

  private apiUrl = 'http://localhost:8080/v1/api/cv'

  constructor(private http: HttpClient) { 
    function emailDomain1(control: AbstractControl): { [key: string]: any } | null {
      const email: string = control.value;
    
      // Kiểm tra xem email có giá trị không
      if (email === null || email === '') {
        return null;
      }
    
      const domain = email.substring(email.lastIndexOf('@') + 1);
    
      // Loại bỏ khoảng trắng không mong muốn và chuyển đổi domain về chữ thường
      const cleanedDomain = domain.trim().toLowerCase();
    
      // Kiểm tra xem domain có phải là 'gmail.com' không
      if (cleanedDomain === 'gmail.com') {
        return null;
      } else {
        return { invalidDomain: true };
      }
    }
  }

  getCVs():Observable<cv[]> {
    return this.http.get<cv[]>(`${this.apiUrl}`);
  } 

  getCVById(id:number): Observable<cv> {
    return this.http.get<cv>(`${this.apiUrl}/${id}`);
  }

  createCV(CVData: any):Observable<cv> {
    return this.http.post<cv>(`${this.apiUrl}/create`,CVData);
  }

  updateCV(id:number,CVData:any):Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/update/${id}`,CVData)
  }

  deleteCV(id:number):Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`)
  }

  approveCV(id:number):Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/SetAccessCv/${id}`,{})
}
  setStatusCV(id:number):Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/SetNotAccessCv/${id}`, {})
  }

  // emailDomain(control: AbstractControl) : {[key:string]:any} | null {
  //   const email: string = control.value
  //   const domain = email.substring(email.lastIndexOf('@')+1);
  //   if(email === '' || domain.toLowerCase() === ' gmail.com') {
  //     return null
  //   } else {
  //     return {domain:true}
  //   }
  // }
  

}