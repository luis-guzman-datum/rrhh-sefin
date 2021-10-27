import { Component, OnInit } from '@angular/core';
import { DashBoardService } from 'src/app/services/DashBoardService';
declare var document: any;
@Component({
  selector: 'app-vacaciones',
  templateUrl: './vacaciones.component.html',
  styleUrls: ['./vacaciones.component.scss']
})
export class VacacionesComponent implements OnInit {


  usuarioInfo: any;
  rolesUser: any;
  token: any;
  stringRoles: any;
  dashBoardTask: any[] = [];

  openForm = false;
  openFormVacas = false;
  dataPSEdit: any;

  getSolicitudVacacionesGerhbySiarhList: any[] = [];

  constructor(private apiDashBoard: DashBoardService) {
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
      let userSesion: any = JSON.parse(sessionStorage.getItem('userInfo') || '{}');
      this.dataPSEdit = {
        ...this.dataPSEdit,
        task_id: '',
        expediente_id: userSesion.expediente_id,
        solicitud_estado_id: 1,
        usuario_sso: userSesion.usuario_sso,
        numero_siarh: userSesion.numero_siarh,
        nombre_usuario_sso: userSesion.primer_nombre + ' ' + userSesion.primer_apellido,
      }
      this.apiDashBoard.getSolicitudVacacionesGerhbySiarh(this.dataPSEdit).subscribe(
        (response2) => {
          this.getSolicitudVacacionesGerhbySiarhList=response2.data;
        },
        (error) => {
          this.getSolicitudVacacionesGerhbySiarhList=[];
        }
      );
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
          task_container_id: response.data.nombre_contenedor,
          task_id: '',
          expediente_id: userSesion.expediente_id,
          solicitud_estado_id: 1,
          usuario_sso: userSesion.usuario_sso,
          numero_siarh: userSesion.numero_siarh,
          nombre_usuario_sso: userSesion.primer_nombre + ' ' + userSesion.primer_apellido,
          option: response.data.url_path
        }

        //getSolicitudVacacionesGerhbySiarhList
        this.apiDashBoard.getSolicitudVacacionesGerhbySiarh(this.dataPSEdit).subscribe(
          (response2) => {

          },
          (error) => {

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
          this.dataPSEdit = response2.data.solicitud.solicitudes_pase_salida;
          this.dataPSEdit = {
            ...this.dataPSEdit,
            task_container_id: response.data.nombre_contenedor,
            task_id: data.task_id,
            hora_salida: this.dataPSEdit.hora_salida.split(' ')[1],
            hora_entrada: this.dataPSEdit.hora_entrada.split(' ')[1],
            option: response.data.url_path
          }
          if (response.data.url_path == 'ingresar-tab') {
            this.dataPSEdit = {
              ...this.dataPSEdit,
              solicitud_pase_salida_id: 1
            }
          }
          this.openForm = true;
          this.moveTab('ingresar-tab');
        });
      }
    }, (error) => {

    });
  }

  btnAbortar(event: any) {
    this.apiDashBoard.getTaskInputByContainerAndTaskId(event).subscribe(
      (response) => {
        console.log(response);
        this.btnRegresar(null);

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
    this.taskDashBoard();
    debugger;
    this.moveTab('pase-salida-tab');
  }

}
