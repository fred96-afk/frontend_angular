import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthRegister } from '../../Service/auth-register';
import { user } from '../../Model/User';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  registerForm: FormGroup;

  constructor(private authRegisterService: AuthRegister, private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value;
      this.authRegisterService.postRegister(username, email, password).subscribe(
        (response: user) => {
          console.log('Registration successful', response);
          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: 'Nos falta un ultimo paso logeate para continuar'
          }).then((result) => {
            if (result.isConfirmed) {
              // Navega a la ruta deseada, por ejemplo '/login' o '/home'
              this.router.navigate(['/']);
            }
          });
        },
        (error) => {
          console.error('Registration failed', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `${error.error.message}`
          });
        }
      );
    }
  }
}
