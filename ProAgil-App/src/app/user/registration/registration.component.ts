import { Router } from '@angular/router';
import { AuthService } from './../../_services/auth.service';
import { User } from './../../_models/User';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  user: User;

  constructor(public authService: AuthService,
              public router: Router,
              public fb: FormBuilder,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.validation();
  }

  validation() {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required, Validators.minLength(4)]],
      passwords: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      }, { validators : this.compararSenhas })
    });
  }

  compararSenhas(fb: FormGroup) {
    const confirmarSenha = fb.get('confirmPassword');
    if (!confirmarSenha.errors || 'senhamatch' in confirmarSenha.errors) {
      if (fb.get('password').value !== confirmarSenha.value) {
        confirmarSenha.setErrors({ senhamatch: true});
      } else {
        confirmarSenha.setErrors(null);
      }
    }
  }

  cadastrarUsuario() {
    if (this.registerForm.valid) {
      this.user = Object.assign({ password: this.registerForm.get('passwords.password').value }, this.registerForm.value);

      this.authService.register(this.user).subscribe(
        () => {
          this.router.navigate(['/user/login']);
          this.toastr.success('Cadastro realizado');
        },
        error => {
          const erro = error.error;
          erro.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('Cadastro Duplicado!');
                break;
              default:
                this.toastr.error(`Erro no cadastro: ${element.code}`);
                break;
            }
          });
        }
      );
    }
  }
}
