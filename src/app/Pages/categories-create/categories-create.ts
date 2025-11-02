import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../../Service/category-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories-create',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './categories-create.html',
  styleUrls: ['./categories-create.css'],
})
export class CategoriesCreateComponent {
  categoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      this.categoryService.createCategory(this.categoryForm.value).subscribe(() => {
        this.router.navigate(['/categories']);
      });
    }
  }
}
