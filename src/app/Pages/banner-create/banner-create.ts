import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BannerService } from '../../Service/banner.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-banner-create',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './banner-create.html',
  styleUrls: ['./banner-create.css'],
})
export class BannerCreateComponent {
  bannerForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private bannerService: BannerService,
    private router: Router
  ) {
    this.bannerForm = this.fb.group({
      title: ['', Validators.required],
      link: ['', Validators.required],
    });
  }

  onFileSelect(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit(): void {
    if (this.bannerForm.valid) {
      const formData = new FormData();
      formData.append('title', this.bannerForm.get('title')?.value);
      formData.append('link', this.bannerForm.get('link')?.value);
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      this.bannerService.createBanner(formData).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Banner Creado',
          text: 'El banner ha sido creado exitosamente.'
        }).then(() => {
          this.router.navigate(['/dashboard/banners']);
        });
      });
    }
  }
}
