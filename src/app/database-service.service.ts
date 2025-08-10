import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseServiceService {

  constructor(private http: HttpClient) { }

  // Create DB and schema
  postDBInfo(dbInfo: any): Observable<any> {
    return this.http.post("http://127.0.0.1:8887/create-storage/", dbInfo);
  }

  // Insert data from file to DB
  insertMany(data: any): Observable<any> {
    return this.http.post("http://127.0.0.1:8887/batch-insert/", data);
  }

  // Delete all documents from DB
  deleteAll(): Observable<any>{
    return this.http.delete("http://127.0.0.1:8887/delete-all/"); 
  }

  // Get all documents from DB
  getAll(): Observable<any> {
    return this.http.get("http://127.0.0.1:8887/get-all/");
  }

  // Update item
  updateItem(itemInfo: any): Observable<any> {
    return this.http.put("http://127.0.0.1:8887/update", itemInfo);
  }
}
