import { Component, inject, OnInit } from '@angular/core';
import { LoanService } from '../../services/loan.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent {
  private _loanService = inject(LoanService);

  prestamos: any[] = []; // Todos los préstamos
  prestamosFiltrados: any[] = []; // Préstamos filtrados según el estado
  prestamosPendientes: any[] = []; // Préstamos pendientes (estado 1)
  prestamosActivos: any[] = []; // Préstamos activos (estado 2)
  titulo: string = 'Solicitudes de Préstamos';

  constructor() {
    this.getLoans();
  }

  getLoans() {
    // Llamar al servicio para obtener todos los préstamos
    this._loanService.getLoans().subscribe(
      (data: any) => {
        this.prestamos = data; // Almacena todos los préstamos obtenidos
        this.prestamosPendientes = this.prestamos.filter(loan => loan.state === 1);
        this.prestamosActivos = this.prestamos.filter(loan => loan.state === 2);
        this.filterLoans(1); // Inicialmente, mostramos solo las solicitudes
      },
      (error) => {
        console.error('Error al cargar los préstamos', error);
      }
    );
  }

  // Filtra los préstamos según el estado (1 para solicitudes, 2 para préstamos activos)
  filterLoans(state: number) {
    if (state === 1) {
      this.prestamosFiltrados = this.prestamosPendientes;
    } else if (state === 2) {
      this.prestamosFiltrados = this.prestamosActivos;
    }
  }

  acceptLoan(loanId: number) {
    // Obtener la fecha actual en formato YYYY-MM-DD
    const today = new Date();
    const returnDate = today.toISOString().split('T')[0]; // Convierte a formato "YYYY-MM-DD"
    
    // Enviar la fecha actual al backend para actualizar el préstamo
    this._loanService.acceptLoan(loanId, returnDate).subscribe(
      (response) => {
        Swal.fire('Préstamo aceptado con éxito', '', 'success');
        this.prestamosPendientes = this.prestamosPendientes.filter(loan => loan.id !== loanId); // Elimina el préstamo aceptado de los pendientes
        this.prestamosActivos.push(response); // Agrega el préstamo aceptado a los activos
        this.filterLoans(1); // Filtra nuevamente para mostrar las solicitudes
      },
      (error) => {
        console.error('Error al aceptar el préstamo', error);
        Swal.fire('Error al aceptar el préstamo', '', 'error');
      }
    );
  }

  rejectLoan(loanId: number) {
    // Mostrar advertencia con SweetAlert2
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Esta solicitud será eliminada permanentemente!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, eliminar el préstamo
        this._loanService.deleteLoan(loanId).subscribe(
          (response) => {
            Swal.fire(
              'Eliminado!',
              'El préstamo ha sido eliminado con éxito.',
              'success'
            );
            this.prestamosPendientes = this.prestamosPendientes.filter(loan => loan.id !== loanId); // Elimina de los pendientes
            this.filterLoans(1); // Filtra nuevamente para mostrar las solicitudes
          },
          (error) => {
            console.error('Error al rechazar el préstamo', error);
            Swal.fire(
              'Error',
              'No se pudo rechazar la solicitud.',
              'error'
            );
          }
        );
      } else {
        // Si el usuario cancela
        Swal.fire(
          'Cancelado',
          'El préstamo no ha sido eliminado.',
          'info'
        );
      }
    });
  }
  showSolicitudes() {
    this.titulo = 'Solicitudes de Préstamos';
    this.prestamosPendientes = this.prestamos.filter(loan => loan.state === 1);
  }

  // Mostrar préstamos activos
  showActivos() {
    this.titulo = 'Préstamos Activos';
    this.prestamosActivos = this.prestamos.filter(loan => loan.state === 2);
  }

  // Método para marcar un préstamo como entregado


}
