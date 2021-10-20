import { retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaseSalidaService {
  
    urlServer: string = environment.BASE_API_URL;

  constructor(private http: HttpClient) {}
 
  
  createSolicitudPaseSalida(dataPost:any,token:any): Observable<any>{
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8','Authorization': 'Bearer ' + token});
    let options = { headers: headers };
    let url = `${this.urlServer}/paseSalidaKSRRHH/createSolicitudPaseSalida`;      
    return this.http.post<any>(url, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getTiposPaseSalida(): Observable<any>{
      let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'});
      let options = { headers: headers };
      let url = `${this.urlServer}/microserviciosRRHH/getTiposPaseSalida`;      
      return this.http.get<any>(url, options).pipe(
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
