import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as jwtDecode from 'jwt-decode';

@Injectable()
export class AuthService {

  BASE_URL = 'http://localhost:4201/auth';
  TOKEN_NAME = 'jbb-token';

  constructor(private http: Http) { }

  login(credentials) {
    return this.http.post(`${this.BASE_URL}/login`, credentials)
      .map(res => res.json());
  }

  userIsLoggedIn() {
    /* En JS, linstruction !! convertit ce qui suit en booléen, ici on aura donc true ou false en fonction
    de la présence ou non d'une valeur pour jbb-token */
    return !!localStorage.getItem(this.TOKEN_NAME);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_NAME);
  }

  register(credentials) {
    // console.log('register', credentials);
    return this.http.post(`${this.BASE_URL}/register`, credentials)
      .map(res => res.json());
  }

  addAuthorizationHeader(token){               // ATTENTION pr créer un header, importer Headers et RequestOptions depuis @angular/http
    // 'Autorization': 'Bearer azeazeazeazeaze'
    const authorizationHeader = new Headers({  // qd on a des headers à envoyer, on créé une nouvelle instance de headers
      'Authorization': 'Bearer ' + token        // on passe en arguments ce que l'on souhaite ajouter
    });
    /* on créé ensuite une nouvelle instance de RequestOptions avec un objet comportant le jeu de clé/valeur avec
    le header nouvellement créé*/
    return new RequestOptions({headers: authorizationHeader});
  }

  decodeToken(token){
    return jwtDecode(token);
  }

}
