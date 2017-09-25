import { Component, OnInit } from '@angular/core';
import { JobService } from './../services/job.service';

@Component({
  selector: 'ag-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  jobs = [];

  constructor(private _jobService: JobService) { }

  ngOnInit() {
  }

  searchJobs(searchData) {
    this._jobService.searchJob(searchData)
                    .subscribe(
                      data => this.jobs = data,
                      error => console.error(error)
                    )
  }

}
