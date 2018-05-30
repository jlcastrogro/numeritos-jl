import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name: '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {}

  /**
   * Tries to log the user in. Successful login redirects to welcome view,
   * unregistered user redirects to register view.
   * @param evt Submitted form event.
   */
  loginHandler(evt: Event) {
    evt.preventDefault();

    this.auth
      .login(this.name.trim())
      .then(() => this.router.navigate(['/welcome']))
      .catch(error => {
        if (error.status === 404) {
          this.router
            .navigate(['/register'], {
              queryParams: { name: this.name }
            })
            .then(null);
        } else {
          console.error('What?', error);
        }
      });
  }
}
