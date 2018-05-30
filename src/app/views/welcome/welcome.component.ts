import {Component, OnInit} from '@angular/core';
import {AuthService, User} from 'app/services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  user: User;
  mainAudio;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.mainAudio = new Audio();
    this.mainAudio.src = '/assets/sounds/Happy sound.mp3';
    this.mainAudio.load();
    this.mainAudio.play();

    this.user = {
      _id: '',
      _rev: '',
      alias: '',
      gender: 'boy',
      islands: []
    };

    this.auth.user
      .subscribe(user => this.user = user);
  }
}
