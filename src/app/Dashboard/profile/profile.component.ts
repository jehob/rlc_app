import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  profile = {
    id: 1,
    email:"sol.seong@gmail.com",
    tel:"0123 456789101",
    street:"Samplestr. 10",
    postal:"12345",
    city:"Sample City"
  }
}
