import {Injectable} from '@angular/core';
import {
  CanActivate,
  Router
} from '@angular/router';

import {AuthService} from './auth.service';
import {Observable} from 'rxjs/index';

/**
 * UserGuard decides if a route may be activated. For the route to be
 * activated the user must be logged in.
 */
@Injectable()
export class UserGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router) { }

  canActivate(): Observable<boolean> {
    const obs = this.auth.isLoggedIn;

    // Redirect if user is not logged in
    obs.subscribe(isLogged => {
      if (!isLogged) {
        this.router.navigate(['/login']);
      }
    });

    return obs;
  }
}
