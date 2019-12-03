import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeatmapsService {

  uri=' http://127.0.0.1:5000';
  constructor(private http:HttpClient) { }

  getMapsData():Observable<any>{
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const httpOptions={
      headers:headers_object
    }
    return this.http.get(`${this.uri}/heat`,httpOptions);
  }

  getVisitData():Observable<any>{
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const httpOptions={
      headers:headers_object
    }
    return this.http.get(`${this.uri}/v1`,httpOptions);
  }


}
