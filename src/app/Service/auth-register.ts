import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroments } from '../../enviroments/enviroments';
import { user } from '../Model/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthRegister {
  private readonly apiurl = `${enviroments.backend}/auth/register`;
  constructor(private http : HttpClient){}
  postRegister(username: string, email: string, password: string): Observable<user>{
    return this.http.post<user>(this.apiurl, {username, email, password})
  };
  
}