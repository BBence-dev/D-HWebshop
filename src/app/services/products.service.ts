import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from '../models/products';

const API_URL = 'http://localhost:8080/api/test/';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  findByTitle(title: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) {}

  getAll(): Observable<Products[]> {
    return this.http.get<Products[]>(API_URL + 'products');
  }
  
  get(id: any): Observable<Products> {
    return this.http.get<Products>(`${API_URL + 'products'}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(API_URL + 'products', data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${API_URL + 'products'}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${API_URL + 'products'}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(API_URL + 'products');
  }

  findByName(name: any): Observable<Products[]> {
    return this.http.get<Products[]>(`${API_URL + 'products'}?name=${name}`);
  }

}
