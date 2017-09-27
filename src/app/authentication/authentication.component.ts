import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'ag-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  jbbData = null;
  isAuthenticated = false;
  welcomeMessage = '';

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    if (localStorage.getItem('jbb-data')) {
      this.refreshFlags();
    }
  }
  refreshFlags() {
    this.isAuthenticated = true;
    this.welcomeMessage = 'Bienvenue';
  }

  login(formData) {
    this._authService.login(formData)
      .subscribe(
      data => this.handleLoginSuccess(data),         // création d'une méthode en cas de succès de l'appel au service
      error => this.handleLoginFailure(error)          // création d'une méthode en cas d'échec de l'appel au service
      );
  }

  handleLoginSuccess(data) {
    console.log('success', data);
    this.jbbData = data;
    this.refreshFlags();
    localStorage.setItem('jbb-data', JSON.stringify(data));
  }

  handleLoginFailure(error) {
    console.error('failure', error);
  }
}
