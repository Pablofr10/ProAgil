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

  constructor(public fb: FormBuilder,
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

  cadastrarUsuario(){
    console.log('Cadastrar');
  }

}
