import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Subject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JobService {

  initialJobs = [];
  jobs = [];
  jobsSubject = new Subject();
  BASE_URL = 'http://localhost:4201/';

  constructor(private http: Http) { }

  getJobs() {
    return this.http.get(this.BASE_URL + 'api/jobs')
      .map(res => res.json());
  }

  addJob(jobData) {
    console.log('inside addJob');
    jobData.id = Date.now();
    // this.jobs = [jobData, ...this.jobs];
    // return this.jobsSubject.next(jobData);

    return this.http.post(this.BASE_URL + 'api/jobs', jobData)
      .map(res => {
        console.log(res);
        this.jobsSubject.next(jobData);
      });
  }

  getJob(id){
    return this.http.get(this.BASE_URL + `api/jobs/${id}`)
                    .map(res => res.json());
  }
}
