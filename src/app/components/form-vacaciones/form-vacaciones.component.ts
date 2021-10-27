import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-form-vacaciones',
  templateUrl: './form-vacaciones.component.html',
  styleUrls: ['./form-vacaciones.component.scss']
})
export class FormVacacionesComponent implements OnInit {

  
  submitted = false;
  _dataPSEdit: any;

  get f() {
    return this.formPS.controls;
  }

  @Output() btnSiguiente = new EventEmitter<any>();
  @Output() btnRegresar = new EventEmitter<any>();
  @Output() btnAbortar = new EventEmitter<any>();

  @Input() modoEdicion!: boolean;

  @Input()
  get dataPSEdit(): any { return this._dataPSEdit; }
  set dataPSEdit(dataPSEdit: any) {
    this._dataPSEdit = dataPSEdit;
    //kie_obj
    this.formPS.get('key_proceses_id')?.setValue(dataPSEdit.key_proceses_id);
    this.formPS.get('key_task_name_inicio')?.setValue(dataPSEdit.key_task_name_inicio);
    this.formPS.get('kie_obj')?.setValue(dataPSEdit.kie_obj);
    this.formPS.get('option')?.setValue(dataPSEdit.option);
    this.formPS.get('task_container_id')?.setValue(dataPSEdit.task_container_id);
    this.formPS.get('task_id')?.setValue(dataPSEdit.task_id);
    this.formPS.get('numero_siarh')?.setValue(dataPSEdit.numero_siarh);
    this.formPS.get('expediente_id')?.setValue(dataPSEdit.expediente_id);

    this.formPS.get('solicitud_vacacion_id')?.setValue(dataPSEdit.solicitud_vacacion_id);
    this.formPS.get('fecha_solicitud')?.setValue(dataPSEdit.fecha_solicitud);
    this.formPS.get('fecha_inicio')?.setValue(dataPSEdit.fecha_inicio);
    this.formPS.get('fecha_fin')?.setValue(dataPSEdit.fecha_fin);
    this.formPS.get('dias')?.setValue(dataPSEdit.dias);

    this.formPS.get('solicitud_estado_id')?.setValue(dataPSEdit.solicitud_estado_id);
    this.formPS.get('observaciones')?.setValue(dataPSEdit.observaciones);
    this.formPS.get('usuario_sso')?.setValue(dataPSEdit.usuario_sso);
    this.formPS.get('vigente')?.setValue(dataPSEdit.vigente);
    this.formPS.get('nombre_usuario_sso')?.setValue(dataPSEdit.nombre_usuario_sso);
  }


  formPS: FormGroup = new FormGroup({
    key_proceses_id: new FormControl(''),
    key_task_name_inicio: new FormControl(''),
    kie_obj: new FormControl(''),
    option: new FormControl(''),
    task_id: new FormControl(''),
    task_container_id: new FormControl(''),
    numero_siarh: new FormControl(''),
    expediente_id: new FormControl(''),
    solicitud_vacacion_id: new FormControl(''),
    fecha_solicitud: new FormControl(''),
    fecha_inicio: new FormControl(''),
    fecha_fin: new FormControl(''),
    dias: new FormControl(''),
    solicitud_estado_id: new FormControl(''),
    observaciones: new FormControl(''),
    usuario_sso: new FormControl(''),
    vigente: new FormControl(''),
    nombre_usuario_sso: new FormControl(''),
  });

  constructor() { }

  ngOnInit(): void {
  }

  submit() {
    let userSesion: any = JSON.parse(sessionStorage.getItem('userInfo') || '{}');
    let data = {
      ...this.formPS.value,
      usuario_sso: userSesion.usuario_sso,
      numero_siarh: userSesion.numero_siarh,
      nombre_usuario_sso: userSesion.primer_nombre + ' ' + userSesion.primer_apellido,
      solicitud_estado_id:4
    }
    console.clear();
    console.log(data);
    if (this.formPS.valid) {
      this.btnSiguiente.emit(data);
     // this.formPS.reset();
    }
  }

  regresar() {
    this.formPS.reset();
    this.btnRegresar.emit(this.formPS.value);
  }

 
  rechazar() {
    let userSesion: any = JSON.parse(sessionStorage.getItem('userInfo') || '{}');
    let data = {
      ...this.formPS.value,
      usuario_sso: userSesion.usuario_sso,
      numero_siarh: userSesion.numero_siarh,
      solicitud_estado_id:5,
      nombre_usuario_sso: userSesion.primer_nombre + ' ' + userSesion.primer_apellido,
      hora_entrada_reloj: '',
      hora_salida_reloj: '',
      hora_salida: this.formPS.value.fecha + ' ' + this.formPS.value.hora_salida,
      hora_entrada: this.formPS.value.fecha + ' ' + this.formPS.value.hora_entrada,

    }
    console.clear();
    console.log(data);
    if (this.formPS.valid) {
      this.btnSiguiente.emit(data);
      this.formPS.reset();
    }
  }


  abortar() {
    let userSesion: any = JSON.parse(sessionStorage.getItem('userInfo') || '{}');
    let data = {
      ...this.formPS.value,
      usuario_sso: userSesion.usuario_sso,
      numero_siarh: userSesion.numero_siarh,
      nombre_usuario_sso: userSesion.primer_nombre + ' ' + userSesion.primer_apellido,
      hora_entrada_reloj: '',
      hora_salida_reloj: '',
      hora_salida: this.formPS.value.fecha + ' ' + this.formPS.value.hora_salida,
      hora_entrada: this.formPS.value.fecha + ' ' + this.formPS.value.hora_entrada,

    }
    console.clear();
    console.log(data);
    if (this.formPS.valid) {
      this.btnAbortar.emit(data);
      this.formPS.reset();
    }
  }
  

 

  

}
