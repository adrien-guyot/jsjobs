import { Component, OnInit } from '@angular/core';

import { JobService } from './../services/job.service';


@Component({
  selector: 'ag-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  jobs: any = [];
  error = '';

  constructor(private _jobService: JobService) { }

  ngOnInit() {
    this._jobService.getJobs()
                    .subscribe(
                      data => this.jobs = data,
                      error => {
                        console.error(error);
                        this.error = error;
                      }
                    )
  }

}
