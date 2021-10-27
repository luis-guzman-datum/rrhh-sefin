import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DemoComponent } from './pages/demo/demo.component';
import { HomeComponent } from './pages/home/home.component';
import { PaseSalidaComponent } from './pages/pase-salida/pase-salida.component';
import { SolicitudVacacionesComponent } from './pages/solicitud-vacaciones/solicitud-vacaciones.component';
import { VacacionesComponent } from './pages/vacaciones/vacaciones.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'home',
    component:HomeComponent
  },
  {
    path:'demo',
    component: DemoComponent
  },
  {
    path:'pase-salida',
    component: PaseSalidaComponent
  },
  {
    path:'vacaciones',
    component: VacacionesComponent
  },
  
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: HomeComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
