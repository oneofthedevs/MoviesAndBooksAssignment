import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetIPService {

  constructor(private _http: HttpClient) { }

  public getIP() {
    console.log('called');
    return this._http.get('http://api.ipify.org/?format=json');
  }
}
