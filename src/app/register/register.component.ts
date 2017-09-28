import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'ag-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }

  register(formData) {
    return this._authService.register(formData)
      .subscribe(
      data => this.handleRegisterSuccess(data),
      error => this.handleRegisterFailure(error)
      );
  }

  handleRegisterSuccess(data) {
    console.log('success', data);
    // localStorage.setItem('jbb-data', JSON.stringify(data));
  }

  handleRegisterFailure(error) {
    console.error('failure', error);
  }

}
