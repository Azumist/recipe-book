import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";


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
  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAK6qIEYTVH5YCL8VikwMzLxyIeiLD2r6o',
    {
      email: email,
      password: password,
      returnSecureToken: true,
    });
    // .pipe(
    //   catchError(errorResponse => {
    //     let errorMessage = 'Unknown error';
    //     if (!errorResponse.error || !errorResponse.error.error )
    //       return throwError(errorResponse);
        
    //     switch(errorResponse.error.error.message) {
    //       case 'EMAIL_EXISTS':
    //         errorMessage = ''
    //     }
    //     return throwError(errorResponse);
    //   })
    // )
  }

  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAK6qIEYTVH5YCL8VikwMzLxyIeiLD2r6o',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }
}