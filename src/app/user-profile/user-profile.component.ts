import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { JobService } from './../services/job.service';

@Component({
  selector: 'ag-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  decodedToken = null;
  isAdmin = false;
  userEmail = '';

  constructor(private _authService: AuthService, private _jobService: JobService) { }

  ngOnInit() {
    if (this._authService.userIsLoggedIn()) {
      const jbbToken = JSON.parse(localStorage.getItem('jbb-token'));
      this.decodedToken = this._authService.decodeToken(jbbToken.token);
      console.log(this.decodedToken);
      // on teste ds le token si le role de l'utilisateur correspond à admin
      if (this.decodedToken && this.decodedToken.role === 'admin') {
        this.isAdmin = true;                  // si ok, on passe le flag à true pour afficher une vue spé admin coté template
      }
    }
    this.userEmail = this.decodedToken.email;
    this.loadJobs(this.userEmail);
  }

  loadJobs(userEmail){
    this._jobService.getJobsByUserEmail(userEmail)
                    .subscribe(
                      data => console.log(data),
                      err => console.error(err)
                    )
  }
}
