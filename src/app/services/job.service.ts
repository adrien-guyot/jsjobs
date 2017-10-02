import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Subject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class JobService {

  initialJobs = [];
  jobs = [];
  jobsSubject = new Subject();
  searchResultSubject = new Subject();
  BASE_URL = 'http://localhost:4201/';

  constructor(private http: Http, private _authService: AuthService) { }

  getJobs() {
    return this.http.get(this.BASE_URL + 'api/jobs')
      .map(res => res.json());
  }

  addJob(jobData, token) {
    console.log('inside addJob');
    jobData.id = Date.now();

    // appel des RequestOptions depuis _authService
    const requestOptions = this._authService.addAuthorizationHeader(token);

    // post(URL, corps du form, options)
    return this.http.post(this.BASE_URL + 'api/jobs', jobData, requestOptions)
                    .map(res => {
                      console.log(res);
                      this.jobsSubject.next(jobData);
                    });
  }

  getJob(id) {
    return this.http.get(this.BASE_URL + `api/jobs/${id}`)
      .map(res => res.json());
  }

  searchJob(criteria) {
    console.log(criteria);
    return this.http.get(`${this.BASE_URL}api/search/${criteria.term}/${criteria.place}`)
      .map(res => res.json())
      .do(res => this.searchResultSubject.next(res));
  }
}
