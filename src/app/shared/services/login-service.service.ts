import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor() { }

  checkLogin(): boolean {
    return !!localStorage.getItem('OrderDetails');
  }
}
