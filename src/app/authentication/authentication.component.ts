import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ag-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  login(formData){
    console.log(formData);
  }

}
