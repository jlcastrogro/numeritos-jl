import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TestGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}

  canActivate(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.auth.user.subscribe(user => {
        if (user.level) {
          observer.next(false);
          this.router.navigate(['./islands']);
        } else {
          observer.next(true);
        }
        observer.complete();
      });
    });
  }
}
