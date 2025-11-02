import { Injectable } from '@angular/core';
import { enviroments } from '../../enviroments/enviroments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { category } from '../Model/category';

@Injectable({
  providedIn: 'root',
})
export class Category {
  private readonly apiurl = `${enviroments.backend}/categories`;
  constructor(private http: HttpClient){}
  getcategories(): Observable<category[]>{
    return this.http.get<category[]>(this.apiurl);
  }
}
