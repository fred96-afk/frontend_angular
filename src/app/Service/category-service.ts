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

  getCategory(id: number): Observable<categories> {
    return this.http.get<categories>(`${this.apiurl}/${id}`);
  }

  createCategory(category: { name: string }): Observable<categories> {
    return this.http.post<categories>(this.apiurl, category);
  }

  updateCategory(id: number, category: { name: string }): Observable<categories> {
    return this.http.put<categories>(`${this.apiurl}/${id}`, category);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiurl}/${id}`);
  }
}