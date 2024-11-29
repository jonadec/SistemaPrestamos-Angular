import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reg-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reg-user.component.html',
  styleUrl: './reg-user.component.css'
})
export class RegUserComponent {
  private _router = inject(Router);

  formRegister!:FormGroup;
  private fb = inject(FormBuilder);
  private _authS=inject(AuthService)
  constructor(){
    this.formRegister=this.fb.group({
      name:['', Validators.required],
      lastname:['', Validators.required],
      username:['', Validators.required],
      email:['', Validators.required],
      role:['', Validators.required],
      password:['', Validators.required]
    })
  }

  register(){
    console.log(this.formRegister.value);
    this._authS.register(this.formRegister.value).subscribe(
      res=>{
        console.log('Registro correcto',res);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        });

      },
      err=>{
        console.log('Error en el registro',err);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error en el registro",
          showConfirmButton: false,
          timer: 150
        });
      }
    )
  }

}
