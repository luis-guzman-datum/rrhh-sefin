import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaseSalidaService } from 'src/app/services/PaseSalidaService';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-pase-salida',
  templateUrl: './pase-salida.component.html',
  styleUrls: ['./pase-salida.component.scss']
})
export class PaseSalidaComponent implements OnInit {
  infoTipoPase: any[]=[];
  userInfo:any;
  idSol: any=0;
  numeroSh:any=0;
  options = {
    timeOut: 5000,
    lastOnBottom: true,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
  };
  /*
       numero_siarh: dataObject.numero_siarh,
        expediente_id: dataObject.expediente_id,
        solicitud_pase_salida_id: dataObject.solicitud_pase_salida_id,
        fecha: dataObject.fecha,
        solicitud_pase_salida_tipo_id: dataObject.solicitud_pase_salida_tipo_id,
        asunto: dataObject.asunto,
        hora_salida: dataObject.fecha + " " + dataObject.hora_salida,
        hora_entrada: dataObject.fecha + " " + dataObject.hora_entrada,
        hora_salida_reloj: dataObject.hora_salida_reloj,
        hora_entrada_reloj: dataObject.hora_entrada_reloj,
        solicitud_estado_id: 1,
        observaciones: dataObject.observaciones,
        usuario_sso: dataObject.usuario_sso,
        nombre_usuario_sso: dataObject.nombre_usuario_sso
  */


  public formPaseSalida: FormGroup = new FormGroup({
    numero_siarh: new FormControl(""),
    expediente_id: new FormControl(""),
    solicitud_pase_salida_id: new FormControl(""),    
    solicitud_estado_id: new FormControl(""),
    nombre_usuario_sso: new FormControl(""),
    usuario_sso: new FormControl(""),
    hora_salida_reloj: new FormControl(""),
    hora_entrada_reloj: new FormControl(""),

    fecha:new FormControl("",[Validators.required]),
    asunto:new FormControl("",[Validators.required]),
    solicitud_pase_salida_tipo_id: new FormControl("",[Validators.required]),
    hora_salida: new FormControl("",[Validators.required]),
    hora_entrada: new FormControl("",[Validators.required]),
    observaciones: new FormControl("")
  });

  constructor(private paseSalida:PaseSalidaService, private _notify: NotificationsService) { }

  ngOnInit(): void {
    this.getTipoPase();
    this.userInfo = JSON.parse(sessionStorage.getItem("userInfo") || '{}').expediente_id;
    this.numeroSh = JSON.parse(sessionStorage.getItem("userInfo") || '{}').numero_siarh;
  }

  submit() {
   // this.formPaseSalida.setValue(1);
   this.formPaseSalida.get('numero_siarh')?.setValue(1);
    if (this.formPaseSalida.valid) {
      this._notify.success('Advertencia', 'Formulario Valido.')
    }
    else {
      this._notify.warn('Advertencia', 'Formulario invalido.')
    }
  }

  getTipoPase(){
    this.paseSalida.getTiposPaseSalida().subscribe(respose =>{
    this.infoTipoPase=respose.data;
    console.log(respose.data);
    });
  }

}
