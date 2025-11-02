import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../Service/product-service';
import { CategoryService } from '../../Service/category-service';
import { categories } from '../../Model/categories';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-create',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './products-create.html',
  styleUrl: './products-create.css',
})
export class ProductsCreate implements OnInit {
  productForm: FormGroup;
  categories: categories[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      category_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.categoryService.getcategories().subscribe(data => {
      this.categories = data;
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.productService.createProduct(this.productForm.value).subscribe(() => {
        // Handle successful creation, e.g., navigate back to the product list
      });
    }
  }
}
