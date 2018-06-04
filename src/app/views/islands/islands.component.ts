import { Component, OnInit } from '@angular/core';
import { User, AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-islands',
  templateUrl: './islands.component.html',
  styleUrls: ['./islands.component.css']
})
export class IslandsComponent implements OnInit {
  user: User;
  islands: any;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.user = {
      _id: '',
      _rev: '',
      alias: 'unknown',
      gender: 'boy',
      islands: []
    };

    this.islands = [[], [], []];

    this.auth.user.subscribe(u => {
      this.user = u;
      console.log(u);
      this.islands = [];
      for (const i of u.islands) {
        const island = [];

        for (const s of i.stars) {
          island.push(s === 3);
        }

        this.islands.push(island);
      }
      console.log(this.islands);
    });
  }
}
