import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataStorageService } from '../shared/data-storage.service';
import { AlertService } from '../shared/alert/alert.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;
  collapsed = true;

  constructor(
    private dataStorageService: DataStorageService, 
    private alertService: AlertService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user
    .subscribe(user => {
      this.isAuthenticated = !user ? false : true; //also !!user works
    })
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  //todo, not used now
  onRouteClick(): void {
    this.alertService.clearAlerts();
  }

  onSaveData(): void {
    this.dataStorageService.storeRecipes()
    .subscribe(response => {
      this.alertService.addAlert(
        {
          type: 'success',
          title: 'Success!',
          message: 'Recipes saved succesfully!'
        });
    }, error => this.alertService.addAlert(error));
  }

  onFetchData(): void {
    this.dataStorageService.fetchRecipes()
    .subscribe(recipes => {
      this.alertService.addAlert(
        {
          type: 'success',
          // title: 'Success!',
          message: 'Recipes fetched succesfully!'
        });
    }, error => this.alertService.addAlert(error));
  }

  onLogout(): void {
    this.authService.logout();
  }

}
