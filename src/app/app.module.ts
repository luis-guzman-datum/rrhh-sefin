import { DoBootstrap, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule, IConfig } from 'ngx-mask'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HomeComponent } from './pages/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { DemoComponent } from './pages/demo/demo.component';
import { KeycloakSecurityService } from './services/keycloak-security.service';
import { RequestInterceptorService } from './services/request-interceptor.service';
import { PaseSalidaComponent } from './pages/pase-salida/pase-salida.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { SolicitudVacacionesComponent } from './pages/solicitud-vacaciones/solicitud-vacaciones.component';
import { FilterPipe } from './pipes/filter.pipe';
import { FormPaseSalidaComponent } from './components/form-pase-salida/form-pase-salida.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

const keycloakSecurityService = new KeycloakSecurityService();
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    NavbarComponent,
    DemoComponent,
    PaseSalidaComponent,
    SolicitudVacacionesComponent,
    FilterPipe,
    FormPaseSalidaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    HttpClientModule,
    SimpleNotificationsModule.forRoot(),
    NgxMaskModule.forRoot(maskConfig),
  ],
  providers: [
    { provide: KeycloakSecurityService, useValue: keycloakSecurityService },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptorService, multi: true },
    ApiService
  ],
  //bootstrap: [AppComponent],
  entryComponents: [AppComponent]
})
export class AppModule implements DoBootstrap {
  ngDoBootstrap(appRef: import("@angular/core").ApplicationRef): void {
    keycloakSecurityService.init().then(data => {
      //console.log('authenticated + toke :', data); 
      sessionStorage.setItem("token",JSON.stringify(data));     
      appRef.bootstrap(AppComponent);

    }).catch(err => {
      console.log();
      console.error('err', err);
    });
  }
}
