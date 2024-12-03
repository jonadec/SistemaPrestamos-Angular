  import { Component, inject, Input } from '@angular/core';
  import { CardproductComponent } from "../../components/cardproduct/cardproduct.component";
  import { ProductService } from '../../services/product.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

  @Component({
    selector: 'app-home',
    standalone: true,
    imports: [RouterLink, CommonModule, NgxPaginationModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
  })
  export class HomeComponent {
  isAdmin = false;
  isLogged = false;
  private authS = inject(AuthService);
  currentPage: number = 1; // Página actual
  itemsPerPage: number = 12;
    products:any[] = [];
    @Input() prestamo:any = {};
    private _productService=inject(ProductService);
    constructor(){
      this.getProducts();
      if(this.authS.getRole() === 'admin'){
        this.isAdmin = true;
      }
    }
    getProducts(){
      this._productService.getProducts().subscribe((data:any)=>{
        this.products = data;
        console.log(data);
      });
    }
    trackByProductId(index: number, product: any): number {
      return product.id;
    }
  }


