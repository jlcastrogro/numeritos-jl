import {Component, OnInit} from '@angular/core';
import {AuthService} from 'app/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

/**
 * Manage registration.
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name = '';
  gender = Math.random() < 0.5 ? 'boy' : 'girl';

  constructor(private auth: AuthService,
              private router: Router,
              private aRoute: ActivatedRoute) { }

  /**
   * Checks on query parameters for a name, this name would appear on
   * register form to enhance user navigation.
   */
  ngOnInit() {
    this.aRoute.queryParams.subscribe(
      params => this.name = params['name'] ? params['name'] : ''
    );
  }

  /**
   * Registers a user. Successful register redirects to welcome page.
   * @param evt Submitted form event.
   */
  registerHandler(evt: Event) {
    evt.preventDefault();

    this.auth.register(this.name, this.gender)
      .then(user =>
        this.auth.login(user.id)
          .then(() => this.router.navigate(['/welcome']))
          .catch(console.error)
      )
      .catch(console.error);
  }
}
