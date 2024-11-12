import { Routes } from '@angular/router';

import { RegUserComponent } from './pages/reg-user/reg-user.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegItemComponent } from './pages/reg-item/reg-item.component';
import { HomeComponent } from './pages/home/home.component';
import { SolicitudComponent } from './pages/solicitud/solicitud.component';
import { SolicitarComponent } from './pages/solicitar/solicitar.component';
import { GestionComponent } from './pages/gestion/gestion.component';
import { LoginComponent } from './pages/login/login.component';


export const routes: Routes = [
  { path: 'nabvar', 
    component: NavbarComponent 
  },
  {
    path: 'home',
    component:HomeComponent
  },

  {
    path:'reg-user', 
   component: RegUserComponent
  },
  {
    path: 'reg-item',
    component: RegItemComponent
  },

  {
    path:'solicitud',
    component: SolicitudComponent
  },
  {
    path:'solicitar',
    component:SolicitarComponent
  },
  {
    path:'gestion',
    component:GestionComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path:'**',
    redirectTo:'login',
    pathMatch:'full'
  }

];
