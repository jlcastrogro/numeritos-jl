import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';

declare var PouchDB: any;
const sessionExpire = 3600000; // (ms) Session expires at 1 hour

/**
 * Determines the model from Users retrieved from DB.
 */
export interface User {
  // PouchDB requirements
  _id: string;
  _rev: string;
  // This app's requirements
  alias: string;
  gender: string;
  testResults?: any;
}

/**
 * Authenticates user and creates new accounts.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  db: any;

  // session: Session; // Default: undefined

  constructor() {
    this.db = new PouchDB('app');
    this.db.allDocs().then(console.log);
  }

  /**
   * Checks for user in database, then logs him in. Returns a promise once
   * the user has been found on db.
   * @param name Account name.
   * @returns A promise that resolves if user was found.
   */
  login(name: string): Promise<User> {
    return this.db.get(name)
      .then(user => {
        const cad = +new Date() + sessionExpire;
        localStorage.setItem('expire', cad + '');
        localStorage.setItem('user', user._id);
      });
  }

  /**
   * Registers a user with give name and gender and post it on db.
   * @param name Name of the new user.
   * @param gender Gender of the new user.
   * @returns A promise that resolves if user has been successfully
   * registered.
   */
  register(name: string, gender: string): Promise<any> {
    return this.db.put({
      _id: name,
      alias: name.split(' ').shift(),
      gender: gender
    });
  }

  /**
   * Logs the user out.
   */
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('expire');
  }

  /**
   * Checks if there is an active session.
   * @returns true if the session is active, false otherwise.
   */
  get isLoggedIn(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      const expire = Number(localStorage.expire);
      const user = localStorage.user;
      // Check for session expire time
      if (user && expire > +new Date()) {
        this.db.get(user)
          .then(() => {
            observer.next(true);
            observer.complete();
            // Update expiration time
            const cad = +new Date() + sessionExpire;
            localStorage.setItem('expire', cad + '');
          })
          .catch(() => {
            observer.next(false);
            observer.complete();
            this.logout();
          });
      } else {
        this.logout();
        observer.next(false);
        observer.complete();
      }
    });
  }

  /**
   * Gets the user logged in.
   * @returns The user logged in.
   */
  get user(): Observable<User> {
    return new Observable<User>(observer => {
      const expire = Number(localStorage.expire);
      const user = localStorage.user;
      // Check for session expire time
      if (user && expire > +new Date()) {
        this.db.get(user)
          .then(u => {
            observer.next(u);
            observer.complete();
            // Update expiration time
            const cad = +new Date() + sessionExpire;
            localStorage.setItem('expire', cad + '');
          })
          .catch(() => {
            observer.error('Invalid user');
            observer.complete();
            this.logout();
          });
      } else {
        this.logout();
        observer.error('Invalid user');
        observer.complete();
      }
    });
  }
}
