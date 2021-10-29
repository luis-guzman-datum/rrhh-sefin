import { Component, Input, OnInit } from '@angular/core';
import { DashBoardService } from 'src/app/services/DashBoardService';

declare var FileReader: any;

@Component({
  selector: 'app-form-vacaciones-docs',
  templateUrl: './form-vacaciones-docs.component.html',
  styleUrls: ['./form-vacaciones-docs.component.scss']
})
export class FormVacacionesDocsComponent implements OnInit {


  @Input() formPS!: any;

  constructor(private api: DashBoardService) { }

  ngOnInit(): void {
    this.getConsultadeDocumentosSolicitud();
  }



  documentos: CargaDocumentosModel[] = [];
  documentos2: CargaDocumentosModel[] = [];

  cargarDocs(event: any) {
    for (let d of event.target.files) {
      let file = d;
      console.log(file);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {

        let doc: CargaDocumentosModel = {
          nombre_archivo: file.name,
          extencion: '.' + file.name.split('.')[file.name.split('.').length - 1],
          doc_documento_empleado_id: 0,
          doc_expediente_id: this.formPS.expediente_id,
          doc_gestor_documental_id: 1,
          doc_numero_siarh: this.formPS.numero_siarh,
          expediente_id: this.formPS.expediente_id,
          numero_siarh: this.formPS.numero_siarh,
          solicitud_vacacion_id: this.formPS.solicitud_vacacion_id,
          solicitud_vacacion_rev_id: 1,
          verificar_archivos: false
        }

        this.documentos.push(doc);

      };
    }
  }


  enviarDocs() {
    for (let d of this.documentos) {
      if (d.verificar_archivos) {
        d.verificar_archivos = 1;
      }
      else {
        d.verificar_archivos = 0;
      }
      this.api.gestionarDocumetosSolicitudVacaciones(d).subscribe(
        (response) => {
          this.documentos = [];
          this.getConsultadeDocumentosSolicitud();
        }
      )

    }

     
    
  }

  update(data: any) {
    if (data.verificar_archivos) {
      data.verificar_archivos = 0;
    }
    else {
      data.verificar_archivos = 1;
    }

    this.gestionarDocumetosSolicitudVacaciones(data);
  }


  updateCarga(data: any) {
    if (data.verificar_archivos) {
      data.verificar_archivos = false;
    }
    else {
      data.verificar_archivos = true;
    }

  }


  gestionarDocumetosSolicitudVacaciones(data: any) {

    this.api.gestionarDocumetosSolicitudVacaciones(data).subscribe(
      (response) => {
        this.documentos = [];
        this.getConsultadeDocumentosSolicitud();
      }
    )
  }

  getConsultadeDocumentosSolicitud() {
    this.api.getConsultadeDocumentosSolicitud(this.formPS).subscribe(
      (response) => {
        this.documentos2 = response.data;
        for (let d of this.documentos2) {
          if (d.verificar_archivos == 1) {
            d.verificar_archivos = true;
          }
          else {
            d.verificar_archivos = false;
          }
        }
      }
    )
  }

  eliminarDocumetosSolicitudVacaciones(data: any) {
    this.api.eliminarDocumetosSolicitudVacaciones(data).subscribe(
      (response) => {
        this.getConsultadeDocumentosSolicitud();
      }
    )
  }


}



export interface CargaDocumentosModel {
  numero_siarh?: any;
  expediente_id?: any;
  solicitud_vacacion_id?: any;
  doc_numero_siarh?: any;
  doc_expediente_id?: any;
  doc_gestor_documental_id?: any;
  doc_documento_empleado_id?: any;
  solicitud_vacacion_rev_id?: any;
  nombre_archivo?: any;
  extencion?: any;
  verificar_archivos?: any;
}