import {Component, OnInit} from '@angular/core';
import {AuthService, User} from 'app/services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  user: User;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.user = {
      _id: '',
      _rev: '',
      alias: '',
      gender: ''
    };

    this.auth.user
      .subscribe(user => this.user = user);
  }

  redirecter() {
    if (this.user.testResults) {
      this.router.navigate(['/islands']);
    } else {
      this.router.navigate(['/test']);
    }
  }
}
