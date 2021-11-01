import { state } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DashBoardService } from 'src/app/services/DashBoardService';
declare var $: any;
declare var bootstrap: any;
declare var document: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  usuarioInfo: any;
  rolesUser: any;
  token: any;
  stringRoles: any;
  dashBoardTask: any[] = [];
  filterQuery = '';
  p: number = 1;

  openForm = false;
  openFormVacas = false;
  dataPSEdit: any;

  getSolicitudVacacionesGerhbySiarhList: any[] = [];
  getPeriodosVacacionesList: any[] = [];

  constructor(private apiDashBoard: DashBoardService,  public datepipe: DatePipe) {
  }

  ngOnInit(): void {
    this.rolesUser = JSON.parse(sessionStorage.getItem("roles") || '{}');
    this.token = JSON.parse(sessionStorage.getItem("token") || '{}');
    this.stringRoles = this.rolesUser.roles.reduce((reducer: any, item: any) => {
      return `${reducer}groups=${item}&`
    }, "");
    this.taskDashBoard();

  }

  moveTab(tab: string) {
    document.getElementById(tab).click();
  }

  getInfoUsuario(): any {
    return JSON.parse(sessionStorage.getItem("userInfo") || '{}');
  }

  taskDashBoard() {
    if (this.token.token) {
      this.apiDashBoard.getDasboardTask().subscribe((respose) => {

        //ESTE FOR ES TEMPORAL
        this.dashBoardTask = [];
        for (let d of respose.data.task_summary) {
          if (d.task_id != 403) {
            this.dashBoardTask.push(d);
          }
        }
      },
        (error) => {
          this.dashBoardTask = [];
        });
    }
  }

  nuevaSolicitudPaseDeSalida() {
    this.dataPSEdit = {
      option: 'ingresar-tab'
    }
    this.apiDashBoard.getProceosPathNuevo(this.dataPSEdit, 'PaseSalida').subscribe((response) => {
      if (response.state == 'success') {
        let userSesion: any = JSON.parse(sessionStorage.getItem('userInfo') || '{}');
        this.dataPSEdit = {
          ...this.dataPSEdit,
          key_proceses_id: response.data.key_proceses_id,
          key_task_name_inicio: response.data.key_task_name_inicio,
          task_container_id: response.data.nombre_contenedor,
          task_id: '',
          solicitud_pase_salida_id: 0,
          expediente_id: userSesion.expediente_id,
          solicitud_estado_id: 1,
          usuario_sso: userSesion.usuario_sso,
          numero_siarh: userSesion.numero_siarh,
          nombre_usuario_sso: userSesion.primer_nombre + ' ' + userSesion.primer_apellido,
          option: response.data.url_path
        }

        this.dataPSEdit = {
          ...this.dataPSEdit,
          ...JSON.parse(response.data.json_pam).solicitud[response.data.kie_obj],
          kie_obj: response.data.kie_obj
        }
        console.log(this.dataPSEdit);
        this.openForm = true;
        this.moveTab('ingresar-tab');
      }
    }, (error) => {

    });


  }

  nuevaSolicitudPaseDeVacaciones() {
    this.dataPSEdit = {
      option: 'vac-add-sol'
    }

    //obtengo el path para redireccionar flujo
    this.apiDashBoard.getProceosPathNuevo(this.dataPSEdit, 'SolicitudVacacion').subscribe((response) => {
      if (response.state == 'success') {
        let userSesion: any = JSON.parse(sessionStorage.getItem('userInfo') || '{}');

        this.dataPSEdit = {
          ...this.dataPSEdit,
          task_id: '',
          expediente_id: userSesion.expediente_id,
          solicitud_estado_id: 1,
          solicitud_vacacion_id: 0,
          usuario_sso: userSesion.usuario_sso,
          numero_siarh: userSesion.numero_siarh,
          nombre_usuario_sso: userSesion.primer_nombre + ' ' + userSesion.primer_apellido,
          option: response.data.url_path,
          task_container_id: response.data.nombre_contenedor,
          key_proceses_id: response.data.key_proceses_id,
          key_task_name_inicio: response.data.key_task_name_inicio,
        }

        this.dataPSEdit = {
          ...this.dataPSEdit,
          ...JSON.parse(response.data.json_pam).solicitud[response.data.kie_obj],
          kie_obj: response.data.kie_obj
        }

        console.log(this.dataPSEdit);
        this.apiDashBoard.getPeriodosVacaciones(this.dataPSEdit).subscribe(
          (response2) => {
            this.getPeriodosVacacionesList = response2.data;
            console.warn('response.data', response2.data);
          },
          (error) => {
            this.getPeriodosVacacionesList = [];
          }
        );


        this.openFormVacas = true;
        this.moveTab('vacaciones-form-tab');
      }
    }, (error) => {

    });

  }


  getProceosPath(data: any) {
    this.apiDashBoard.getProceosPath(data).subscribe((response) => {
      if (response.state == 'success') {
        this.apiDashBoard.getTaskInputByContainerAndTaskId(data).subscribe((response2) => {



          if (response2.data.solicitud.solicitudes_pase_salida) {
            this.dataPSEdit = response2.data.solicitud.solicitudes_pase_salida;
          }
          else {
            this.dataPSEdit = response2.data.solicitud;
          }

         

          this.dataPSEdit = {
            ...this.dataPSEdit,
            ...JSON.parse(response.data.json_pam).solicitud[response.data.kie_obj],
            task_container_id: response.data.nombre_contenedor,
            task_id: data.task_id,
            kie_obj: response.data.kie_obj,
            option: response.data.url_path,
            task_proc_inst_id:data.task_proc_inst_id
          }

          if (response.data.url_path == 'ingresar-tab') {
            this.dataPSEdit = {
              ...this.dataPSEdit,
              solicitud_pase_salida_id: 1
            }
          }

          //gen-car-rep-oper

          if (response.data.url_path != 'vac-add-sol' && response.data.url_path != 'rev-sol-jef' && response.data.url_path != 'rev-sol-dir' && response.data.url_path != 'rev-sol-op' && response.data.url_path != 'rev-sol-sug' && response.data.url_path != 'gen-car-rep-oper' && response.data.url_path != 'com-doc-fis-dig') {
            this.openForm = true;
            this.moveTab('ingresar-tab');
          }
          else {

            this.apiDashBoard.getPeriodosVacaciones(this.dataPSEdit).subscribe(
              (response2) => {
                this.getPeriodosVacacionesList = response2.data;
                console.warn('response.data', response2.data);
              },
              (error) => {
                this.getPeriodosVacacionesList = [];
              }
            );

            this.openFormVacas = true;
            this.moveTab('vacaciones-form-tab');
          }
        });
      }
    }, (error) => {

    });
  }


  enviarDocs() {

  }



  btnAbortar(event: any) {
    this.apiDashBoard.getTaskInputByContainerAndTaskId(event).subscribe(
      (response) => {
        console.log(response);
        this.apiDashBoard.abortSolicitudPaseSalida(event).subscribe(
          (response2) => {

            this.btnRegresar(null);
          }
        );

      },
      (error) => {

      }
    )
  }

  btnSiguiente(event: any) {
    console.log(event);
    if (event.task_id != '' && event.task_id != null) {
      this.apiDashBoard.updateSolicitudPaseSalida(event).subscribe(
        (response) => {
          console.log(response);
          this.btnRegresar(null);

        },
        (error) => {

        }
      )
    }
    else {
      delete event.task_id;
      this.apiDashBoard.createSolicitudPaseSalida(event).subscribe(
        (response) => {
          console.log(response);
          this.btnRegresar(null);
        },
        (error) => {

        }
      )
    }


  }

  btnRegresar(event: any) {
    this.dataPSEdit = { option: 'pase-salida-tab' };
    this.openForm = false;
    this.openFormVacas = false;
    this.taskDashBoard();
    this.moveTab('pase-salida-tab');
  }

}
