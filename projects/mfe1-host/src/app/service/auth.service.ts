import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../models/auth-response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  apiurl = 'http://localhost:8080/service/auth';

  constructor(private http: HttpClient) {

  }

  registerUser(inputdata: any) {
    {
      return this.http.post(this.apiurl + '/register', inputdata)
    }
  }

  loginUser(inputdata: any) {
    {
      return this.http.post(this.apiurl + '/validateUser', inputdata)
    }
  }

  updateUser(inputdata: any) {
    {
      return this.http.post(this.apiurl + '/updateUser', inputdata)
    }
  }

  isloggedin(){
    return sessionStorage.getItem('userId')!=null;
  }
  
  getrole(){
    return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():'';
  }

  getAllUsers(): Observable<AuthResponse[]> {
    return this.http.get<AuthResponse[]>(this.apiurl + '/getAllUsers');
  }
}
