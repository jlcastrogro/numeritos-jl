import { Component, OnInit } from '@angular/core';
import { User, AuthService } from 'app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

/**
 * Provides information about islands' id.
 */
export const map = {
  forest: 0,
  beach: 1,
  city: 2,
  0: 'forest',
  1: 'beach',
  2: 'city'
};

@Component({
  selector: 'app-islands',
  templateUrl: './islands.component.html',
  styleUrls: ['./islands.component.css']
})
export class IslandsView implements OnInit {
  user: User;
  islands: any;
  unlockedRecently = 0;

  constructor(private auth: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(console.log);
    this.user = {
      _id: '',
      _rev: '',
      alias: 'unknown',
      gender: 'boy',
      islands: []
    };
    // Initialize to avoid errors, determines the stars per island
    this.islands = [[], [], []];
    // Gets real information about user
    this.auth.user.subscribe(u => {
      this.user = u;
      // Check for new unlocked islands
      u.lastLevel = u.lastLevel || 0;
      // Checks if there are new unlocked islands
      this.unlockedRecently = u.level - u.lastLevel;
      // If there are new islands unlocked, show for 1.5s a notification
      if (this.unlockedRecently) {
        setTimeout(() => {
          this.user.lastLevel = this.user.level;
          this.unlockedRecently = 0;
          this.auth.updateUser(this.user);
        }, 1500);
      }

      // Start checking islands' completed games
      this.islands = [];
      for (const i of u.islands) {
        const island = [];
        // Checks the number of stars per game
        for (const s of i.stars) {
          // Three stars means game completed, hence, gold star
          island.push(s === 3);
        }
        // Updates islands stars
        this.islands.push(island);
      }
    });
  }
}
