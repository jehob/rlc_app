import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private auth: AuthService) {
    this.auth.login('jehob@web.de', 'qwe123');
  }

  ngOnInit() {
  }

}
