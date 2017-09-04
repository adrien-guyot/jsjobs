import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'ag-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  jobs: any = [];

  constructor(private http: Http) { }

  ngOnInit() {
    this.http.get('data/jobs.json')
            .map(res => {
              console.log(res.json());
              this.jobs = res.json();
            })
            .subscribe();
  }

}
