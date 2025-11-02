import { Component, OnInit } from '@angular/core';
import { products } from '../../Model/products';
import { ProductService } from '../../Service/product-service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { categories } from '../../Model/categories';
import { CategoryService } from '../../Service/category-service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-products',
  imports: [CommonModule, CurrencyPipe, RouterLink],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit{

  productos: products[] = [];
  categories: Map<number, string> = new Map();

  constructor(
    private _productService : ProductService,
    private _categoryService: CategoryService
  ){}

  ngOnInit(): void {
      this.obtenerProductos();
      this.obtenerCategorias();
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

  obtenerCategorias(){
    this._categoryService.getcategories().subscribe({
      next: (data) => {
        data.forEach(category => {
          this.categories.set(category.id, category.name);
        });
      },
      error: (err) => {
        console.error(`error al obtener categorias: ${err}`)
      }
    })
  }

  getCategoryName(categoryId: number): string {
    return this.categories.get(categoryId) || 'Unknown';
  }
}
