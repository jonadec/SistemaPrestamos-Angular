import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core'

@Component({
  selector: 'app-cardproduct',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cardproduct.component.html',
  styleUrl: './cardproduct.component.css'
})
export class CardproductComponent {
  @Input() productCard:any={};
  
}
  