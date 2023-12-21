import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private apiUrl = 'http://localhost:8000/api/auth';

  constructor(private http:HttpClient,private router: Router) { }

  login(email: string,password: string):Observable<any> {
    return this.http.post(`${this.apiUrl}/Login`, {
      email: email,
      password: password
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('Authorization');
  }

  setToken(token:string) {
    return localStorage.setItem('Authorization',token);
  }

  

}
