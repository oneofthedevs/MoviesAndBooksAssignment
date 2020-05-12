import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginServiceService } from '../services/login-service.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutAuthGuard implements CanActivateChild {
  constructor(private _login: LoginServiceService, private _router: Router) { }

  canActivateChild(): boolean {
    if (this._login.checkLogin()) {
      return true;
    }
    else {
      this._router.navigate(['']);
      return false;
    }
  }
}

