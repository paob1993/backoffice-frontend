import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  buttonPress: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') && this.authService.isAuthenticated()) {
      this.router.navigate(['/vehicles']);
    }
    this.buttonPress = false;
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required]]
    });
  }

  onLogin() {
    this.buttonPress = true;
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          if (response.error) {
            Swal.fire({
              title: 'Error',
              text: response.error,
              icon: 'error',
              heightAuto: false
            });
          } else {
            localStorage.setItem('user', JSON.stringify(response));
            localStorage.setItem('token', JSON.stringify(response?.token));
            this.router.navigate(['/vehicles']);
          }
        },
        error: (e) => {
          console.log(e)
          Swal.fire({
            title: 'Error',
            text: e.error,
            icon: 'error',
            heightAuto: false
          });
        }
      });
    }
  }

}
