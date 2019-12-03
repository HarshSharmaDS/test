import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';



// var headers_object = new HttpHeaders({
//   'Content-Type': 'application/json',
// });
// const httpOptions={
//   headers:headers_object
// }
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  

  uri=' http://127.0.0.1:5000';
  constructor(private http:HttpClient) { }

  getVisits():Observable<any>{
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const httpOptions={
      headers:headers_object
    }
     return this.http.get(`${this.uri}/visits`,httpOptions);
  }


  getBouncedEngagedVisits():Observable<any>{
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const httpOptions={
      headers:headers_object
    }
    return this.http.get(`${this.uri}/bounced_engaged_visits`,httpOptions);
  }


  getDwellTime():Observable<any>{
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const httpOptions={
      headers:headers_object
    }
    return this.http.get(`${this.uri}/dwelltime`,httpOptions);
  }


  getLoyality():Observable<any>{
    var headers_object= new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const httpOptions={
      headers:headers_object
    }
    return this.http.get(`${this.uri}/loyality`,httpOptions);
  }


  getMultipleVisits():Observable<any>{
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const httpOptions={
      headers:headers_object
    }
    return this.http.get(`${this.uri}/multiple_visits`,httpOptions);
  }


  getDwellTimeBreakdown():Observable<any>{
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const httpOptions={
      headers:headers_object
    }
    return this.http.get(`${this.uri}/dwell_time_breakdown`,httpOptions);
  }

  

}
