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
    // on a des données de jobs.json + des données ajoutées par notre formulaire
    // on a pas encore récupéré de données de data/jobs.json
    // on a des jobs a récupérer de data/jobs.json

    if (this.jobs.length > 0 && this.initialJobs.length > 0) {
      console.log('case if');
      return Observable.of([...this.jobs, ...this.initialJobs])

    } else if (this.jobs.length > 0 && this.initialJobs.length === 0) {
      console.log('case elseif');
      return this.http.get(this.BASE_URL + 'api/jobs')
                      .map(res => res.json())
                      .do(data => {
                        this.initialJobs = data;
                        this.jobs = [...this.jobs, ...this.initialJobs];
                      });
    } else {
    console.log('else');
      return this.http.get(this.BASE_URL + 'api/jobs')
                      .map(res => res.json())
                      .do(data => this.initialJobs = data);
    }
  }

  addJobs(jobData) {
    jobData.id = Date.now();
    this.jobs = [jobData, ...this.jobs];
    return this.jobsSubject.next(jobData);
  }
}
