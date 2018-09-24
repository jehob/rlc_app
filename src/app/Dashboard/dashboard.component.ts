import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

export interface Section {
  id: string;
  type: string;
  status: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
  }

  showProfile(){
    this.router.navigate(['profile'], {relativeTo: this.route});
  }

  showRecords(){
    this.router.navigate(['records'], {relativeTo: this.route});
  }

}
