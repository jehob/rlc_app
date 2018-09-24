import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

export interface Section {
  id: string;
  type: string;
  status: string;
}

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
