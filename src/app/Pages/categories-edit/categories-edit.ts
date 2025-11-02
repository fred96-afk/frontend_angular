import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../Service/category-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories-edit',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './categories-edit.html',
  styleUrls: ['./categories-edit.css'],
})
export class CategoriesEditComponent implements OnInit {
  categoryForm: FormGroup;
  categoryId: number;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
    });
    this.categoryId = 0;
  }

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.params['id'];
    this.categoryService.getCategory(this.categoryId).subscribe(data => {
      this.categoryForm.patchValue(data);
    });
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      this.categoryService.updateCategory(this.categoryId, this.categoryForm.value).subscribe(() => {
        this.router.navigate(['/categories']);
      });
    }
  }
}
