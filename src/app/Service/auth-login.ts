import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroments } from '../../enviroments/enviroments';
import { user } from '../Model/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthLogin {
  private readonly apiurl = `${enviroments.backend}/auth/login`;
  constructor(private http : HttpClient){}
  postlogin(username: string, password: string): Observable<user>{
    return this.http.post<user>(this.apiurl, {username, password})
  };
  
}
