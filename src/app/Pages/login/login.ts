import { Component } from '@angular/core';
import { AuthLogin } from '../../Service/auth-login';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { user } from '../../Model/User';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  loginForm: FormGroup;

  constructor(private authLoginService: AuthLogin, private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authLoginService.postlogin(username, password).subscribe(
        (response: user) => {
          console.log('Login successful', response);
          Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            text: 'Has iniciado sesión correctamente!'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/productos']);
            }
          });
        },
        (error) => {
          console.error('Login failed', error);
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
