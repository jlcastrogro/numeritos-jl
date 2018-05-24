import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

const loginRegex = /.*login.*/;
const registerRegex = /.*register.*/;
const welcomeRegex = /.*welcome.*/;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  mainAudio;
  view;

  constructor(private router: Router) {
    router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        if (loginRegex.test(evt.url)) {
          this.view = 'login';
        } else if (registerRegex.test(evt.url)) {
          this.view = 'register';
        } else if (welcomeRegex.test(evt.url)) {
          this.view = 'welcome';
        } else {
          this.view = 'unknown';
        }

        switch (this.view) {
          case 'login':
          case 'register':
          case 'welcome':
            this.mainAudio.play();
            break;
          default:
            this.mainAudio.pause();
            break;
        }
      }
    });
  }

  ngOnInit() {
    this.mainAudio = new Audio();
    this.mainAudio.src = '/assets/sounds/Curious comedy music.mp3';
    this.mainAudio.load();
    this.mainAudio.loop = true;
  }
}
