  import { Component, inject, Input } from '@angular/core';
  import { CardproductComponent } from "../../components/cardproduct/cardproduct.component";
  import { ProductService } from '../../services/product.service';
import { RouterLink } from '@angular/router';

  @Component({
    selector: 'app-home',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
  })
  export class HomeComponent {
    products:any[] = [];
    @Input() prestamo:any = {};
    private _productService=inject(ProductService);
    constructor(){
      this.getProducts();
    }
    getProducts(){
      this._productService.getProducts().subscribe((data:any)=>{
        this.products = data;
        console.log(data);
      });
    }
  }


