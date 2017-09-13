import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class JobService {

  jobs = [];
  jobsSubject = new Subject();

  constructor(private http: Http) { }

  getJobs() {
    return this.http.get('data/jobs.json')
      .map(res => res.json());
  }

  addJobs(jobData){
    jobData.id = Date.now();
    return this.jobsSubject.next(jobData);
  }
}
