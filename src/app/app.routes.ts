import { Routes } from '@angular/router';

import { RegUserComponent } from './pages/reg-user/reg-user.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegItemComponent } from './pages/reg-item/reg-item.component';
import { HomeComponent } from './pages/home/home.component';
import { SolicitudComponent } from './pages/solicitud/solicitud.component';
import { SolicitarComponent } from './pages/solicitar/solicitar.component';
import { GestionComponent } from './pages/gestion/gestion.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { PrestamosactivosComponent } from './pages/prestamosactivos/prestamosactivos.component';
import { PrestamospasadosComponent } from './pages/prestamospasados/prestamospasados.component';
import { EditarproductoComponent } from './pages/editarproducto/editarproducto.component';


export const routes: Routes = [
  { path: 'nabvar', 
    component: NavbarComponent 
  },
  {
    path: 'home',
    component:HomeComponent,
    canActivate: [AuthGuard]
  },

  {
    path:'reg-user', 
    component: RegUserComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' }
  },
  {
    path: 'reg-item',
    component: RegItemComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' }
  },

  {
    path:'solicitud',
    component: SolicitudComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' }
  },
  {
    path:'solicitar/:id',
    component:SolicitarComponent,
    canActivate: [AuthGuard],
    data: { role: 'user' }
  },
  {
    path:'gestion',
    component:GestionComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' }
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'prestamosactivos',
    component: PrestamosactivosComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' }
  },
  {
    path: 'prestamospasados',
    component: PrestamospasadosComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' }
  },
  {
    path: 'editarproducto/:id',
    component: EditarproductoComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' }
  },
  {
    path:'**',
    redirectTo:'login',
    pathMatch:'full'
  }

];
