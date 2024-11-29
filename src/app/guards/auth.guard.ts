import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Obtener el rol del usuario desde localStorage
    const role = localStorage.getItem('role');

    // Verificar si la ruta requiere un rol específico
    const requiredRole = route.data['role'] as string;

    // Si no hay rol en localStorage o no coincide con el requerido, redirigir al login
    if (!role || (requiredRole && role !== requiredRole)) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
