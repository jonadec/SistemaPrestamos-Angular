import { Component, inject } from '@angular/core';
import { CardproductComponent } from "../../components/cardproduct/cardproduct.component";
import { product } from '../../app.interfaces';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardproductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  productos:product[]=[];
  private _productS=inject(ProductService);
  constructor(){
    this.productos=this._productS.getProductos();
  }
}


