import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-pase-salida',
  templateUrl: './form-pase-salida.component.html',
  styleUrls: ['./form-pase-salida.component.scss']
})
export class FormPaseSalidaComponent implements OnInit {

  submitted = false;
  _dataPSEdit: any;

  get f() {
    return this.formPS.controls;
  }

  @Output() btnSiguiente = new EventEmitter<any>();
  @Output() btnRegresar = new EventEmitter<any>();

  @Input() modoEdicion!: boolean;

  @Input()
  get dataPSEdit(): any { return this._dataPSEdit; }
  set dataPSEdit(dataPSEdit: any) {
    this._dataPSEdit = dataPSEdit;
    this.formPS.get('task_container_id')?.setValue(dataPSEdit.task_container_id);
    this.formPS.get('numero_siarh')?.setValue(dataPSEdit.numero_siarh);
    this.formPS.get('expediente_id')?.setValue(dataPSEdit.expediente_id);
    this.formPS.get('solicitud_pase_salida_id')?.setValue(dataPSEdit.solicitud_pase_salida_id);
    this.formPS.get('fecha')?.setValue(dataPSEdit.fecha);
    this.formPS.get('solicitud_pase_salida_tipo_id')?.setValue(dataPSEdit.solicitud_pase_salida_tipo_id);
    this.formPS.get('asunto')?.setValue(dataPSEdit.asunto);
    this.formPS.get('hora_salida')?.setValue(dataPSEdit.hora_salida);
    this.formPS.get('hora_entrada')?.setValue(dataPSEdit.hora_entrada);
    this.formPS.get('hora_entrada_reloj')?.setValue(dataPSEdit.hora_entrada_reloj);
    this.formPS.get('hora_salida_reloj')?.setValue(dataPSEdit.hora_salida_reloj);
    this.formPS.get('solicitud_estado_id')?.setValue(dataPSEdit.solicitud_estado_id);
    this.formPS.get('observaciones')?.setValue(dataPSEdit.observaciones);
    this.formPS.get('usuario_sso')?.setValue(dataPSEdit.usuario_sso);
    this.formPS.get('nombre_usuario_sso')?.setValue(dataPSEdit.nombre_usuario_sso);
  }


  formPS: FormGroup = new FormGroup({
    task_container_id: new FormControl(''),
    numero_siarh: new FormControl(''),
    expediente_id: new FormControl(''),
    solicitud_pase_salida_id: new FormControl(''),
    fecha: new FormControl(''),
    solicitud_pase_salida_tipo_id: new FormControl(''),
    asunto: new FormControl(''),
    hora_salida: new FormControl(''),
    hora_entrada: new FormControl(''),
    hora_salida_reloj: new FormControl(''),
    hora_entrada_reloj: new FormControl(''),
    solicitud_estado_id: new FormControl(''),
    observaciones: new FormControl(''),
    usuario_sso: new FormControl(''),
    nombre_usuario_sso: new FormControl(''),
  });


  constructor() { }

  ngOnInit(): void {
  }

  submit() {
    if (this.formPS.valid) {
      this.btnSiguiente.emit(this.formPS.value);
    }
  }

  regresar(){
    this.btnRegresar.emit(this.formPS.value);
  }

}
