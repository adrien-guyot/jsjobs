import { JobService } from './../services/job.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ag-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  jobs = [];

  constructor(private _jobService: JobService) { }

  ngOnInit() {
    this._jobService.searchResultSubject.subscribe(
      data => this.handleSearchResult(data)
    )
  }

  handleSearchResult(data){
    this.jobs = data.jobs;
  }

}
