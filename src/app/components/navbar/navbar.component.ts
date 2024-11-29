import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isAdmin = false;
  isLogged: boolean = false;
  private authS = inject(AuthService);
  constructor() { 
    if(this.authS.getRole() === 'admin'){
      this.isAdmin = true;
    }
  }
  logout(){
    this.authS.logout();
  }
  isLog(){
    this.isLogged = this.authS.isLogged();
  }


}
