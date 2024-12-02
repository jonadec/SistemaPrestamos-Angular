import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  
  private _router = inject(Router);
  formLogin!:FormGroup;
  private fb = inject(FormBuilder);
  private _authS=inject(AuthService);
  token:any[]=[];
  user={
    id:'',
    username:'',
    password:'',
    token:'',
    role:''
  }

  constructor(){
    this.formLogin=this.fb.group({
      username:['', Validators.required],
      password:['', Validators.required],
    })
  }

  login(){
    console.log(this.formLogin.value);
    this._authS.login(this.formLogin.value).subscribe(
      (res:any)=>{
        console.log('Login correcto',res);
        Swal.fire({
          icon: 'success',
          title: 'Login correcto',
          text: 'Bienvenido',
          position: 'top-end',
        }); 
        this.user.role=res.user.role;
        this.token=res.token;
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.user.role);
        localStorage.setItem('id', res.user.id);
        this._router.navigate(['/home']);
        
      },
      err=>{
        console.log('Error en el login',err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Usuario o contraseña incorrectos'
        });
  })}

}
