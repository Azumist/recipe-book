import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { AlertService } from "../shared/alert/alert.service";
import { AuthService } from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {}

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
        // console.log(response);
        this.alertService.addAlert({
            type: 'success',
            message: 'Logged in succesfully.'
          }
        );
        this.router.navigate(['/recipes']);
      }, error => {
        this.isLoading = false;
        this.alertService.addAlert(error);
      });
    }
    else {
      this.authService.signup(email, password)
      .subscribe(response => {
        this.isLoading = false;
        // console.log(response);
        this.alertService.addAlert(
          {
            type: 'success',
            message: 'Account created succesfully.'
          }
        );
        this.router.navigate(['/recipes']);
      }, error => {
        this.isLoading = false;
        this.alertService.addAlert(error);
      });
    }

    form.reset();
  }
}