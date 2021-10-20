import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-solicitud-vacaciones',
  templateUrl: './solicitud-vacaciones.component.html',
  styleUrls: ['./solicitud-vacaciones.component.scss']
})
export class SolicitudVacacionesComponent implements OnInit {
  options = {
    timeOut: 5000,
    lastOnBottom: true,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
  };
  /*
  "expediente_id":1,
    "fecha_solicitud":"01/08/2020 02:05",
    "fecha_inicio":"01/08/2020 02:05",
    "fecha_fin":"05/08/2020 02:05",
	  "dias":5,
    "numero_siarh":1,
    "solicitud_vacacion_id": 0,
	  "solicitud_estado_id":1,
    "observaciones":"nada",
	  "vigente":"1",
    "usuario_sso": "1",
    "nombre_usuario_sso": "admin1"
  */
    public formSolicitudVacaciones: FormGroup = new FormGroup({
      expediente_id: new FormControl(1),
      fecha_solicitud: new FormControl(1),
      fecha_inicio: new FormControl("",[Validators.required]),    
      fecha_fin: new FormControl("",[Validators.required]),
      dias: new FormControl(1),
      numero_siarh: new FormControl(1),
      solicitud_vacacion_id: new FormControl(1),
      solicitud_estado_id: new FormControl(1),  
      observaciones:new FormControl(""),
      vigente:new FormControl(1),
      usuario_sso: new FormControl(1),
      nombre_usuario_sso: new FormControl(1)
    });

  constructor( private _notify: NotificationsService) { }

  ngOnInit(): void {
  }
  submit() {
    if (this.formSolicitudVacaciones.valid) {
      this._notify.success('Advertencia', 'Formulario Valido.')
    }
    else {
      this._notify.warn('Advertencia', 'Formulario invalido.')
    }
  }

}
