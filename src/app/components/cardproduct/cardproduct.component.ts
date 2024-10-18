import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cardproduct',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cardproduct.component.html',
  styleUrl: './cardproduct.component.css'
})
export class CardproductComponent {
  @Input({required: true}) producto:any;
  private _routerchido = inject(Router);
}
