import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroments } from '../../enviroments/enviroments';
import { Observable } from 'rxjs';
import { products } from '../Model/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly apiurl = `${enviroments.backend}/products`;

  constructor(private http: HttpClient) { }

  getproducts(): Observable<products[]>{
    return this.http.get<products[]>(this.apiurl);
  }

  createProduct(product: FormData): Observable<any> {
    return this.http.post<any>(this.apiurl, product);
  }
}