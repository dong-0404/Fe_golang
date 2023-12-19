import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cv } from './cv.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerCvServiceService {

  private apiUrl = 'http://localhost:8080/v1/api/cv'

  constructor(private http: HttpClient) { }

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

}
