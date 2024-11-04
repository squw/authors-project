import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AIPResponseModel } from '../model/interface/authors';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }
  
  getAuthors(): Observable<AIPResponseModel> {
    return this.http.get<AIPResponseModel>("http://localhost:8080/author_table_display")
  }
}
