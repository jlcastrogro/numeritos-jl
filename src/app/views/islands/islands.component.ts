import { Component, OnInit } from '@angular/core';
import { User, AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-islands',
  templateUrl: './islands.component.html',
  styleUrls: ['./islands.component.css']
})
export class IslandsComponent implements OnInit {
  user: User;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.user = {
      _id: '',
      _rev: '',
      alias: 'unknown',
      gender: 'boy',
      islands: []
    };

    this.auth.user.subscribe(u => this.user = u);
  }
}
