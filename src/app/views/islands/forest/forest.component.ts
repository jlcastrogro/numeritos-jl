import { Component, OnInit } from '@angular/core';
import { User, AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'island-forest',
  templateUrl: './forest.component.html',
  styleUrls: ['./forest.component.css']
})
export class ForestComponent implements OnInit {
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
          // Determines which kind of star to show.
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
