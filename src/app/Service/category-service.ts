import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroments } from '../../enviroments/enviroments';
import { Observable } from 'rxjs';
import { categories } from '../Model/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly apiurl = `${enviroments.backend}/categories`;

  constructor(private http: HttpClient) { }

  getcategories(): Observable<categories[]>{
    return this.http.get<categories[]>(this.apiurl);
  }
}