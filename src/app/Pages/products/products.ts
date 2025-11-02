import { Component, OnInit } from '@angular/core';
import { products } from '../../Model/products';
import { ProductService } from '../../Service/product-service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-products',
  imports: [CommonModule, CurrencyPipe, RouterLink],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit{

  productos: products[] = [];

  constructor(
    private _productService : ProductService
  ){}

  ngOnInit(): void {
      this.obtenerProductos();
  }

  obtenerProductos(){
    this._productService.getproducts().subscribe({
      next: (data) => {
        this.productos = Array.isArray(data) ? data : [data];
      },
      error: (err) => {
        console.error(`error al obtener productos: ${err}`)
      },
      complete: () => {
        console.log('productos completados');
      }
    })
  }
}
