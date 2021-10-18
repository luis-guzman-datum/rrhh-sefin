import { retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  
  urlServer: string = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  getPokemons(): Observable<any>{
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'});
    let options = { headers: headers };
    let url = `${this.urlServer}/pokemon/ditto`;
    return this.http.get<any>(url, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  login(data:any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization':'hjdhksdhshiuhewie'});
    let url = `${this.urlServer}/auth/login`;
    let body = JSON.stringify(data);
    let options = { headers: headers };
    return this.http.post<any>(url, body, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
