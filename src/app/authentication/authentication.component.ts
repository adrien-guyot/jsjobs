import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'ag-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }

  login(formData){
    this._authService.login(formData)
                     .subscribe(
                       data => this.handleLoginSuccess,         // création d'une méthode en cas de succès de l'appel au service
                       error => this.handleLoginFailure          // création d'une méthode en cas d'échec de l'appel au service
                     );
  }

  handleLoginSuccess(data) {
    console.log('success', data);
  }

  handleLoginFailure(error) {
    console.error('failure', error);
  }
}
