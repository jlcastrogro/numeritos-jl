import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';

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
  level?: number; // Current level of the user
  lastLevel?: number; // Last level registered on island screen
  islands: { // Information about the user progress on each island
    stars: number[]; // The stars on game 0, ..., 3 of this island
  }[];
}

/**
 * Authenticates user and creates new accounts.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  db: any;

  constructor() {
    this.db = new PouchDB('app');
  }

  /**
   * Checks for user in database, then logs him in. Returns a promise once
   * the user has been found on db.
   * @param name Account name.
   * @returns A promise that resolves if user was found.
   */
  login(name: string): Promise<User> {
    return this.db.get(name.toLowerCase())
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
      _id: name.toLowerCase(),
      alias: name.split(' ').shift(),
      gender: gender,
      islands: [{
        stars: [0, 0, 0, 0]
      }, {
        stars: [0, 0, 0, 0]
      }, {
        stars: [0, 0, 0, 0]
      }]
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
   * Checks if a given username already exists.
   * @param username A string given to check if user has been taken.
   */
  validUser(username: string): Observable<boolean> {
    return new Observable(observer => {
      this.db.get(username)
        .then(() => {
          observer.next(false);
          observer.complete();
        })
        .catch(() => {
          observer.next(true);
          observer.complete();
        });
    });
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
   * Updates the user with the information given.
   * @param user New information about user.
   */
  updateUser(user: User): Promise<any> {
    return this.db.put(user);
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
