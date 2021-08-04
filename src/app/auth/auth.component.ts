import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AlertService } from "../shared/alert/alert.service";
import { AuthService, AuthResponseData } from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private alertService: AlertService) {}

  private handleError(errorResponse: HttpErrorResponse) {
    let error = {type: 'danger', title: 'Error.', message: 'Unknown error.'};
    console.log(errorResponse);

    if (!errorResponse.error || !errorResponse.error.error ) {
      this.alertService.addAlert(error);
      return;
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
    this.alertService.addAlert(error);
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
    if (this.isLoginMode) {
      this.authService.login(email, password)
      .subscribe(response => {
        this.isLoading = false;
        console.log(response);

        this.alertService.addAlert({
            type: 'success',
            title: 'Success!',
            message: 'Logged in succesfully.'
          }
        );

      }, errorResponse => {
        this.isLoading = false;
        this.handleError(errorResponse);
      });
    }
    else {
      this.authService.signup(email, password)
      .subscribe(response => {
        this.isLoading = false;
        console.log(response);
  
        this.alertService.addAlert(
          {
            type: 'success',
            title: 'Success!',
            message: 'Account created succesfully.'
          }
        );
  
      }, errorResponse => {
        this.isLoading = false;
        this.handleError(errorResponse);
      });
    }

    form.reset();
  }
}