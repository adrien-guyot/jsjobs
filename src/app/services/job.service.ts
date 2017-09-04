import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class JobService {

  constructor(private http: Http) { }

  getJobs() {
    return this.http.get('data/jobs.json')
      .map(res => res.json());
  }
}
