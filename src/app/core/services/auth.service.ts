import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  public username: string;
  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<any>(`/users/authenticate`, { username, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('username', JSON.stringify(username));
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }

  /**
   * Logs out the user and clear credentials.
   *
   * @returns {Observable<boolean>}
   * @memberof AuthenticationService
   */
  logout(): Observable<boolean> {
    // remove user from local storage to log user out
    localStorage.removeItem('username');
    localStorage.removeItem('currentUser');
    return of(true);
  }
}