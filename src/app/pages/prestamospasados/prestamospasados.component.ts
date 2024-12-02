import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { LoanService } from '../../services/loan.service';

@Component({
  selector: 'app-prestamospasados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prestamospasados.component.html',
  styleUrl: './prestamospasados.component.css'
})
export class PrestamospasadosComponent {

  private _loanService = inject(LoanService);

  prestamos: any[] = []; // Todos los préstamos
  prestamosFiltrados: any[] = []; // Préstamos filtrados según el estado
  prestamosActivos: any[] = []; // Préstamos pendientes (estado 1)
  titulo: string = 'Prestamos pasados';

  constructor() {
    this.getLoans();
    
  }

  getLoans() {
    // Llamar al servicio para obtener todos los préstamos
    this._loanService.getLoans().subscribe(
      (data: any) => {
        this.prestamos = data; // Almacena todos los préstamos obtenidos
        this.prestamosActivos = this.prestamos.filter(loan => loan.state === 3);
        this.filterLoans(3); // Inicialmente, mostramos solo las solicitudes
      },
      (error) => {
        console.error('Error al cargar los préstamos', error);
      }
    );
  }

  // Filtra los préstamos según el estado (1 para solicitudes, 2 para préstamos activos)
  filterLoans(state: number) {
    if (state === 3) {
      this.prestamosFiltrados = this.prestamosActivos;
    } 
  }

  handinLoan(loanId: number) {
    // Obtener la fecha actual en formato YYYY-MM-DD
    const today = new Date();
    const returnDate = today.toISOString().split('T')[0]; // Convierte a formato "YYYY-MM-DD"
    
    // Enviar la fecha actual al backend para actualizar el préstamo
    this._loanService.handinLoan(loanId, returnDate).subscribe(
      (response) => {
        Swal.fire('Préstamo entregado con éxito', '', 'success');
        this.prestamosActivos = this.prestamosActivos.filter(loan => loan.id !== loanId); 
        this.filterLoans(2);
      },
      (error) => {
        console.error('Error al entregar el préstamo', error);
        Swal.fire('Error al entregar el préstamo', '', 'error');
      }
    );
  }

  deleteLoan(loanId: number) {
    // Mostrar advertencia con SweetAlert2
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Este prestamo será eliminado permanentemente!',
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
            this.prestamosActivos = this.prestamosActivos.filter(loan => loan.id !== loanId); // Elimina de los pendientes
            this.filterLoans(1); // Filtra nuevamente para mostrar las solicitudes
          },
          (error) => {
            console.error('Error al eliminar el préstamo', error);
            Swal.fire(
              'Error',
              'No se pudo eliminar el prestamo.',
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


}

