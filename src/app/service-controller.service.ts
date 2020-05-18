import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from '../../node_modules/rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ServiceControllerService {
  url="http://localhost:3100/";
  data:any;
  constructor(private http:HttpClient) { }
  postData(data,type){
    return this.http.post(this.url +"api/"+ type, JSON.stringify(data), httpOptions)
        .pipe(
            catchError(this.handleError)
        );

  }
  private handleError (error: HttpErrorResponse) {
    // TODO: seems we cannot use messageService from here...
    let errMsg = (error.message) ? error.message : 'Server error';
    console.error(errMsg);
    if (error.status === 401 ) {
        window.location.href = '/';
    }
    return Observable.throw(errMsg);
}
}
