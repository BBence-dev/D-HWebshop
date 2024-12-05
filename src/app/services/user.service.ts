import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

const API_URL = 'http://localhost:8080/api/test/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }
  
  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(API_URL + 'all');
  }

  get(id: any): Observable<User> {
    return this.http.get<User>(`${API_URL + 'all'}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(API_URL + 'all', data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.patch(`${API_URL + 'admin'}/${id}`, data);
  }

  update1(id: any, data: any): Observable<any> {
    return this.http.put(`${API_URL + 'all'}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${API_URL + 'all'}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(API_URL + 'all');
  }

  findByName(name: any): Observable<User[]> {
    return this.http.get<User[]>(`${API_URL + 'admin'}?name=${name}`);
  }

}
