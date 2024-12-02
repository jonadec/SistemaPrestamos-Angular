import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoanService } from '../../services/loan.service';
import { AuthService } from '../../services/auth.service';
import { state } from '@angular/animations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitar',
  standalone: true,
  imports: [FormsModule, RouterLink],  // Puedes agregar otros módulos si es necesario
  templateUrl: './solicitar.component.html',
  styleUrls: ['./solicitar.component.css']
})
export class SolicitarComponent implements OnInit {
  private productId: number=0;
  private _productService = inject(ProductService);  // Uso correcto de inject
  private _loanService = inject(LoanService);  // Uso correcto de inject
  private _route = inject(ActivatedRoute);  // Uso correcto de inject
  private _router = inject(Router);  // Uso correcto de inject
  private _authService = inject(AuthService); 

  product: any;  // Aquí puedes definir un tipo según la estructura de datos que recibes
  loan:any={
    id: null,
    product_id: null,
    user_id: null,
    state: 1,
    loan_date: ""
  }
  user:any = {};
  ngOnInit(): void {
    // Obtener el ID del producto desde la ruta
    const id = this._route.snapshot.paramMap.get('id');
    if (id) {
      this.productId = +id;  
    } else {
      console.error('ID del producto no encontrado en la ruta');
    }

    // Llamada al servicio para obtener el producto
    this._productService.getProductById(this.productId).subscribe(
      (data) => {
        this.product = data;
      },
      (error) => {
        console.error('Error al cargar el producto', error);
      }
    );

    this.loan.user_id = this._authService.getUser();
    if (!this.loan.user_id) {
      console.error('Usuario no encontrado en localStorage');
    }
  }

  onSubmit(): void {
    if (!this.product.id || !this.loan.user_id) {
      console.error('Producto o usuario no encontrado');
      return;
    }

    const currentDate = new Date().toISOString().split('T')[0]; 

    // Crear el objeto de préstamo
    const loan = {
      product_id: this.product.id,
      user_id: this.loan.user_id,  // Usar el ID del usuario cargado
      state: 1,  // Estado inicial del préstamo
      loan_date: currentDate,  // Fecha de la solicitud
    };

    // Llamar al servicio de préstamos para crear la solicitud de préstamo
    this._loanService.newLoan(loan).subscribe(
      (response) => {
        console.log('Préstamo creado exitosamente', response);
        Swal.fire('Préstamo solicitado', 'Tu solicitud de préstamo ha sido enviada', 'success');
        // Redirigir al usuario a una página de confirmación o agradecimiento
        this._router.navigate(['/home']);
      },
      (error) => {
        console.error('Error al crear el préstamo', error);
        Swal.fire('Error', 'Hubo un error al solicitar el préstamo', 'error');
      }
    );
  }
}