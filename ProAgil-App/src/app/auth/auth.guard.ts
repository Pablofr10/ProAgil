import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private toastr: ToastrService,
              private auth: AuthService) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('token') !== null) {
      if (!this.auth.loggedIn()) {
        localStorage.removeItem('token');
        this.router.navigate(['/user/login']);
        this.toastr.warning('Essa sessão expirada, insira o login novamente.');
      } else {
        return true;
      }
    } else {
      this.router.navigate(['/user/login']);
      this.toastr.warning('Para acessar o sistema é necessário realizar o login.');
      return false;
    }
  }
  
}
