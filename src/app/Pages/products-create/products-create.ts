import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../Service/product-service';
import { CategoryService } from '../../Service/category-service';
import { categories } from '../../Model/categories';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-create',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './products-create.html',
  styleUrl: './products-create.css',
})
export class ProductsCreate implements OnInit {
  productForm: FormGroup;
  categories: categories[] = [];
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      offer_price: [null],
      category_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.categoryService.getcategories().subscribe(data => {
      this.categories = data;
    });
  }

  onFileSelect(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('name', this.productForm.get('name')?.value);
      formData.append('description', this.productForm.get('description')?.value);
      formData.append('price', this.productForm.get('price')?.value);
      if (this.productForm.get('offer_price')?.value) {
        formData.append('offer_price', this.productForm.get('offer_price')?.value);
      }
      formData.append('category_id', this.productForm.get('category_id')?.value);
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      this.productService.createProduct(formData).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Producto Creado',
          text: 'El producto ha sido creado exitosamente.'
        }).then(() => {
          this.router.navigate(['/dashboard/products']);
        });
      });
    }
  }
}
