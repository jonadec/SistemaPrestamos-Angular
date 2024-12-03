import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editarproducto',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './editarproducto.component.html',
  styleUrl: './editarproducto.component.css'
})
export class EditarproductoComponent {
  private _route=inject(ActivatedRoute);
  private _productService=inject(ProductService);
  private _router=inject(Router);
  private fb=inject(FormBuilder)
  productForm: FormGroup;


  
  productId: number;

  constructor(


  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      code: [''],
      quantity: [0, [Validators.required, Validators.min(0)]],
      image_url: ['']
    });
    this.productId = +this._route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void {
    this._productService.getProductById(this.productId).subscribe(
      (product) => {
        this.productForm.patchValue(product);
      },
      (error) => {
        console.error('Error al cargar el producto:', error);
        Swal.fire('Error', 'No se pudo cargar el producto.', 'error');
      }
    );
  }

  updateProduct(): void {
    if (this.productForm.valid) {
      this._productService.updateProduct(this.productId, this.productForm.value).subscribe(
        () => {
          Swal.fire('Éxito', 'Producto actualizado correctamente.', 'success').then(() => {
            this._router.navigate(['/home']); // Redirige a la lista de productos
          });
        },
        (error) => {
          console.error('Error al actualizar el producto:', error);
          Swal.fire('Error', 'No se pudo actualizar el producto.', 'error');
        }
      );
    }
  }
}
