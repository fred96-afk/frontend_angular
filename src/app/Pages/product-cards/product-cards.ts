import { Component, OnInit } from '@angular/core';
import { products } from '../../Model/products';
import { ProductService } from '../../Service/product-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-cards',
  imports: [CommonModule],
  templateUrl: './product-cards.html',
  styleUrls: ['./product-cards.css'],
})
export class ProductCardsComponent implements OnInit {
  productos: products[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getproducts().subscribe(data => {
      this.productos = data;
    });
  }
}
