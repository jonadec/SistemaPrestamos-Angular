import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reg-item',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reg-item.component.html',
  styleUrl: './reg-item.component.css'
})
export class RegItemComponent {
  private _router = inject(Router)
  formRegister!:FormGroup;
  private fb = inject(FormBuilder);
  private _authS=inject(ProductService)
  constructor(){
    this.formRegister=this.fb.group({
      code:['', Validators.required],
      name:['', Validators.required],
      category:['', Validators.required],
      quantity:['', Validators.required],
      description:['', Validators.required],
      image_url:['', Validators.required]
    })
  }
  register(){
    if(this.formRegister.valid){
      this._authS.newProduct(this.formRegister.value).subscribe(data=>{
        console.log(data);
        Swal.fire({
          icon: 'success',
          title: 'Producto registrado',
          text: 'El producto se ha registrado correctamente',
        })
        this._router.navigate(['/home']);
      })
    }
    else{
      console.log('Formulario invalido');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se pudo registrar el producto',
      })
    }
  }

}
