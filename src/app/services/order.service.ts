import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/orders';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/test/';

@Injectable({
  providedIn: 'root'
})
export class Orderervice {
  findByTitle(title: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) {}

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(API_URL + 'orders');
  }

  get(id: any): Observable<Order> {
    return this.http.get<Order>(`${API_URL + 'orders'}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(API_URL + 'orders', data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${API_URL + 'orders'}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${API_URL + 'orders'}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(API_URL + 'orders');
  }

  findByName(name: any): Observable<Order[]> {
    return this.http.get<Order[]>(`${API_URL + 'orders'}?name=${name}`);
  }

  updateStock(items: any[]) {
    return this.http.post('/orders-stock', { items });
  }
  

}
