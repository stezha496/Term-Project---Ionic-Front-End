import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateDBService {

  constructor(private http: HttpClient) {

  }
  //POST
  postDBInfo(dbInfo: any): Observable<any> {
    return this.http.post("http://127.0.0.1:8887/create-storage/", dbInfo);
  }
}