import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { JobService } from './services/job.service';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobAddFormComponent } from './job-add-form/job-add-form.component';
import { DaysAgoPipe } from './pipes/days-ago.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    JobListComponent,
    JobAddFormComponent,
    DaysAgoPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [JobService],
  bootstrap: [AppComponent]
})
export class AppModule { }
