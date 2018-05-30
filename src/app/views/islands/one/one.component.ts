import { Component, OnInit } from '@angular/core';
import { User, AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.css']
})
export class OneComponent implements OnInit {
  user: User;
  stars = [[], [], [], []];

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.user = {
      _id: '',
      _rev: '',
      alias: 'unknown',
      gender: 'boy',
      islands: []
    };

    this.auth.user.subscribe(u => {
      this.user = u;
      for (let i = 0; i < this.user.islands[0].stars.length; i++) {
        for (let j = 0; j < 3; j++) {
          if (this.user.islands[0].stars[i] > j) {
            this.stars[i].push('gold');
          } else {
            this.stars[i].push('silver');
          }
        }
      }
    });
  }

  redirect(url: string) {
    this.router.navigate([url]);
  }
}
