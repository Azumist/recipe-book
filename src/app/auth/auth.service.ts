import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";

import { AlertService } from "../shared/alert/alert.service";
import { User } from "./user.model";

// --- FIREBASE DOCS ---
// idToken	(string)	A Firebase Auth ID token for the newly created user.
// email	(string)	The email for the newly created user.
// refreshToken	(string)	A Firebase Auth refresh token for the newly created user.
// expiresIn	(string)	The number of seconds in which the ID token expires.
// localId	(string)	The uid of the newly created user.
// OPTIONAL
// registered	(boolean)	Whether the email is for an existing account.
export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertService: AlertService,
  ) {}

  private handleErrors(errorResponse: HttpErrorResponse) {
    let error = {type: 'danger', title: 'Error.', message: 'Unknown error.'};

    if (!errorResponse.error || !errorResponse.error.error ) {
      return throwError(error);
    }
    switch(errorResponse.error.error.message) {
      //Login errors
      case 'EMAIL_NOT_FOUND':
        error.title = 'Account doesn\'t exist'
        error.message = 'There is no account associated with this email address. Try creating one.'
      break;
      case 'INVALID_PASSWORD':
        error.title = 'Invalid password.'
        error.message = 'Provided password is invalid. Check for typos.'
      break;
      case 'USER_DISABLED':
        error.title = 'Account disabled.'
        error.message = 'This account was disabled by administrator.'
      break;
      //Signup errors
      case 'EMAIL_EXISTS':
        error.title = 'Account already exists!'
        error.message = 'Try different email address.'
      break;
      case 'OPERATION_NOT_ALLOWED':
        error.title = 'Not allowed!'
        error.message = 'Signing up was disabled.'
      break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        error.title = 'Too many attempts!'
        error.message = 'You have tried to sign in too many times, try again later.'
      break;
    }
    return throwError(error);
  }

  private handleAuthentication(email: string, localId: string, idToken: string, expiresIn: number) {
    // getTime() returns miliseconds, firebase returs seconds
    const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
    const user = new User(
      email,
      localId,
      idToken,
      expirationDate
    );
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userSession', JSON.stringify(user));
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseApiKey}`,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    })
    .pipe(
      catchError(errorResponse => this.handleErrors(errorResponse)),
      tap(responseData => {
        this.handleAuthentication(
          responseData.email,
          responseData.localId,
          responseData.idToken, 
          +responseData.expiresIn
        );
      })
    );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseApiKey}`,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    )
    .pipe(
      catchError(errorResponse => this.handleErrors(errorResponse)),
      tap(responseData => {
        this.handleAuthentication(
          responseData.email,
          responseData.localId,
          responseData.idToken, 
          +responseData.expiresIn
        );
      })
    );
  }

  autoLogin() {
    const userSession = JSON.parse(localStorage.getItem('userSession'));
    if (!userSession) {
      return;
    }

    const retrievedSession = new User(
      userSession.email,
      userSession.id,
      userSession._token,
      new Date(userSession._tokenExpirationDate)
    );

    if (retrievedSession.token) {
      this.user.next(retrievedSession);
      const expirationDuration = new Date(userSession._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.alertService.addAlert({type: 'info', title: '', message: 'Logged out succesfully.'});
    this.router.navigate(['/auth']);
    localStorage.removeItem('userSession');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}