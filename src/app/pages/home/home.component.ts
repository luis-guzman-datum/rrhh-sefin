import { state } from '@angular/animations';
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

  openForm = false;
  dataPSEdit: any;

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
    this.openForm=true;
    document.getElementById(tab).click();
  }

  getInfoUsuario(): any {
    return JSON.parse(sessionStorage.getItem("userInfo") || '{}');
  }

  taskDashBoard() {
    if (this.token.token) {
      this.apiDashBoard.getDasboardTask().subscribe((respose) => {
        this.dashBoardTask = respose.data.task_summary;
      },
        (error) => {
          this.dashBoardTask = [];
        });
    }
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
          }
          this.openForm = true;
          this.moveTab(response.data.url_path);
        });
      }
    }, (error) => {

    });
  }



  abortSolicitudPaseSalida(data: any) {

    this.apiDashBoard.getTaskInputByContainerAndTaskId(data).subscribe((respose) => {

    }, (error) => {

    });

  }

  btnSiguiente(event: any) {

    if (event.task_id != '') {
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
    this.dataPSEdit = null;
    this.openForm = false;
    this.taskDashBoard();
    this.moveTab('pase-salida-tab');
  }

}
