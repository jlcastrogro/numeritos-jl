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
export class IslandsGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    switch (state.url) {
      case '/islands':
        return this.islands();
      default:
        if (state.url.indexOf('/island') !== -1) {
          return this.island(state.url.replace('/island/', ''));
        } else {
          switch (state.url.replace('/game/', '')) {
            case 'shopping':
              return this.island('3');
            case 'counting':
              return this.island('1');
            default:
              return this.island('2');
          }
        }
    }
  }

  islands() {
    return new Observable<boolean>(observer => {
      this.auth.user.subscribe(
        user => {
          if (user.level) {
            observer.next(true);
          } else {
            observer.next(false);
            this.router.navigate(['/test']);
          }
          observer.complete();
        },
        () => {
          observer.next(false);
          observer.complete();
          this.router.navigate(['/login']);
        }
      );
    });
  }

  island(i: string) {
    return new Observable<boolean>(observer => {
      const n = Number(i);
      this.auth.user.subscribe(
        user => {
          if (user.level >= n) {
            observer.next(true);
          } else {
            observer.next(false);
            this.router.navigate(['/islands']);
          }
          observer.complete();
        },
        () => {
          observer.next(false);
          observer.complete();
          this.router.navigate(['/login']);
        }
      );
    });
  }
}
