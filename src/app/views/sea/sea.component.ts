import { Component, OnInit } from '@angular/core';
import { User, AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-sea',
  templateUrl: './sea.component.html',
  styleUrls: ['./sea.component.css']
})
export class SeaView implements OnInit {
  user: User;
  islands: any;
  unlockedRecently = 0;
  audio = new Audio();

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.user = {
      _id: '',
      _rev: '',
      alias: 'unknown',
      gender: 'boy',
      islands: []
    };

    this.audio.src = '/assets/sounds/Winner sound.mp3';
    this.audio.load();
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
        this.audio.play();
        setTimeout(() => {
          this.user.lastLevel = this.user.level;
          this.unlockedRecently = 0;
          this.auth.updateUser(this.user);
        }, this.audio.duration * 1000);
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
