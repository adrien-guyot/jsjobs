import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as jwtDecode from 'jwt-decode';

@Injectable()
export class AuthService {

  BASE_URL = 'http://localhost:4201/auth';

  constructor(private http: Http) { }

  login(credentials) {
    return this.http.post(`${this.BASE_URL}/login`, credentials)
      .map(res => res.json());
  }

  userIsLoggedIn() {
    /* En JS, linstruction !! convertit ce qui suit en booléen, ici on aura donc true ou false en fonction
    de la présence ou non d'une valeur pour jbb-data */
    return !!localStorage.getItem('jbb-data');
  }

  logout() {
    localStorage.removeItem('jbb-data');
  }

  register(credentials) {
    // console.log('register', credentials);
    return this.http.post(`${this.BASE_URL}/register`, credentials)
      .map(res => res.json());
  }

  decodeToken(token){
    return jwtDecode(token);
  }

}
