import { retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashBoardService {

  urlServer: string = environment.BASE_API_URL;
  rolesUser = JSON.parse(sessionStorage.getItem("roles") || '{}');
  token = JSON.parse(sessionStorage.getItem("token") || '{}');
  stringRoles = this.rolesUser.roles.reduce((reducer: any, item: any) => {
    return `${reducer}groups=${item}&`
  }, "");


  constructor(private http: HttpClient) { }

  getDasboardTask(): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token });
    let options = { headers: headers };
    let url = `${this.urlServer}/paseSalidaKSRRHH/getTaskByGroup/${this.stringRoles}`;
    return this.http.get<any>(url, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }


  getSolicitudPaseSalidaById(idSolicitud: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token });
    let options = { headers: headers };
    let url = `${this.urlServer}/microserviciosRRHH/getSolicitudPaseSalidaById/${idSolicitud}`;
    return this.http.get<any>(url, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }


  getTaskInputByContainerAndTaskId(data: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token });
    let options = { headers: headers };
    let url = `${this.urlServer}/paseSalidaKSRRHH/getTaskInputByContainerAndTaskId/${data.task_id}/${data.task_container_id}`;
    return this.http.get<any>(url, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  //http://api-sefin-rrhh-pasesalida-desa-api-rrhh-pool.apps.galel.sefin.gob.hn/api/pasesSalida

  pasesSalida(data: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token });
    let options = { headers: headers };
    let url = `${this.urlServer}/pasesSalida`;
    delete data.task_container_id;
    delete data.option;
    delete data.key_proceses_id;
    delete data.key_task_name_inicio;
    delete data.kie_obj;
    delete data.fechas_vacas;
    return this.http.put<any>(url, data, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  ///actualizarTarea/{id}/{kieContainerID}

  actualizarTarea(data: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token });
    let options = { headers: headers };
    let url = `${this.urlServer}/paseSalidaKSRRHH/actualizarTarea/${data.task_id}/${data.task_container_id}`;
    return this.http.post<any>(url, data, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getProceosPath(data: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token });
    let options = { headers: headers };
    let url = `${this.urlServer}/microserviciosRRHH/getProceosPath/${data.task_container_id}/${data.task_subject}`;
    return this.http.get<any>(url, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getProceosPathNuevo(data: any, tipoDeSolicitud: string): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token });
    let options = { headers: headers };
    let url = `${this.urlServer}/microserviciosRRHH/getContainer/${data.option}/${tipoDeSolicitud}`; //PaseSalida - vacaciones-form-tab
    return this.http.get<any>(url, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getTiposPaseSalida(): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token });
    let options = { headers: headers };
    let url = `${this.urlServer}/microserviciosRRHH/getTiposPaseSalida`;
    return this.http.get<any>(url, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }


  abortSolicitudPaseSalida(data: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token });
    let options = { headers: headers };
    let url = `${this.urlServer}/paseSalidaKSRRHH/abortSolicitudPaseSalida/${data.task_proc_inst_id}/${data.task_container_id}`;
    return this.http.delete<any>(url, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }


  createSolicitudPaseSalida(data: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token });
    let options = { headers: headers };
    let url = `${this.urlServer}/paseSalidaKSRRHH/crearTareaInicial/${data.task_container_id}/${data.key_proceses_id}/${data.key_task_name_inicio}`;
    delete data.task_container_id;
    delete data.option;
    delete data.key_proceses_id;
    delete data.key_task_name_inicio;
    delete data.fechas_vacas;

    let dt = {
      solicitud: {
        [data.kie_obj]: {
          ...data
        }
      }
    }

    delete dt.solicitud[data.kie_obj].kie_obj;

    console.log(dt);

    return this.http.post<any>(url, dt, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // http://api-sefin-rrhh-gateway-desa-api-rrhh-pool.apps.galel.sefin.gob.hn/api/microserviciosRRHH/eliminarDocumetosSolicitudVacaciones

  eliminarDocumetosSolicitudVacaciones(data: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token });
    let options = { headers: headers };
    let url = `${this.urlServer}/microserviciosRRHH/eliminarDocumetosSolicitudVacaciones`;
    console.log(data);
    return this.http.post<any>(url, data, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  gestionarDocumetosSolicitudVacaciones(data: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token });
    let options = { headers: headers };
    let url = `${this.urlServer}/microserviciosRRHH/gestionarDocumetosSolicitudVacaciones`;
    console.log(data);
    return this.http.post<any>(url, data, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }


  getInfoEmpleadoID(idEmpleadoSiar: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token });
    let options = { headers: headers };
    let url = `${this.urlServer}/microserviciosRRHH/getInfoEmpleadoID/${idEmpleadoSiar}`;
    return this.http.get<any>(url, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getConsultadeDocumentosSolicitud(data: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token });
    let options = { headers: headers };
    let url = `${this.urlServer}/microserviciosRRHH/getConsultadeDocumentosSolicitud/${data.numero_siarh}/${data.solicitud_vacacion_id}`;
    console.log(data);
    return this.http.get<any>(url, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  updateSolicitudPaseSalida(data: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token });
    let options = { headers: headers };
    let url = `${this.urlServer}/paseSalidaKSRRHH/actualizarTarea/${data.task_id}/${data.task_container_id}`;
    delete data.task_id;
    delete data.task_container_id;
    delete data.option;
    delete data.key_task_name_inicio;
    delete data.fechas_vacas;

    let dt = {
      solicitud: {
        [data.kie_obj]: {
          ...data
        }
      }
    }

    delete dt.solicitud[data.kie_obj].kie_obj;

    console.log(dt);

    return this.http.put<any>(url, dt, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }


  //all vacaciones


  getSolicitudVacacionesGerhbySiarh(data: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token });
    let options = { headers: headers };
    let url = `${this.urlServer}/microserviciosRRHH/getSolicitudVacacionesGerhbySiarh/${data.numero_siarh}`;
    delete data.task_id;
    delete data.task_container_id;
    delete data.option;
    delete data.fechas_vacas;
    return this.http.get<any>(url, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }


  getPeriodosVacaciones(data: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token });
    let options = { headers: headers };
    let url = `${this.urlServer}/microserviciosRRHH/getPeriodosVacaciones/${data.numero_siarh}`;
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
