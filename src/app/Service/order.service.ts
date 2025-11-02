import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroments } from '../../enviroments/enviroments';
import { Observable } from 'rxjs';
import { Order } from '../Model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly apiurl = `${enviroments.backend}/orders`;

  constructor(private http: HttpClient) { }

  createOrder(order: Order): Observable<any> {
    return this.http.post<any>(this.apiurl, order);
  }

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.apiurl);
  }
}
