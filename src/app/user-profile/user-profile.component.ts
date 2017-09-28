import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ag-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  decodedToken = null;

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    if (this._authService.userIsLoggedIn()) {
      const jjbToken = JSON.parse(localStorage.getItem('jbb-data'));
      this.decodedToken = this._authService.decodeToken(jjbToken.token);
      console.log(this.decodedToken);
    }
  }
}
