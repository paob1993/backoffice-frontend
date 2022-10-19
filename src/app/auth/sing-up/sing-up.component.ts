import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/users.service';
import { PasswordMatch } from 'src/app/shared/utils/passwordMatch.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent implements OnInit {
  singUpForm: FormGroup;
  buttonPress: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buttonPress = false;
    this.createForm();
  }

  createForm(): void {
    this.singUpForm = this.formBuilder.group({
      'name': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      'lastName': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required]],
      'passwordRepeat': ['', [Validators.required]]
    }, {
      validators: PasswordMatch
    });

  }

  onSingUp(): void {
    this.buttonPress = true;
    if (this.singUpForm.valid) {
      this.userService.addUser(this.singUpForm.value).subscribe({
        next: (v: any) => {
          if (v.error) {
            Swal.fire({
              title: 'Error',
              text: v.error,
              icon: 'error',
              heightAuto: false
            });
          } else {
            Swal.fire({
              title: 'Éxito',
              text: 'Se ha registrado exitosamente',
              icon: 'success',
              heightAuto: false
            }).then(() => {
              this.router.navigate(['/']);
            });
          }
        },
        error: (e) => {
          console.log(e)
          Swal.fire({
            title: 'Error',
            text: "Error",
            icon: 'error',
            heightAuto: false
          });
        }
      });
    }
  }

}
