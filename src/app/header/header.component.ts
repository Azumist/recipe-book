import { Component } from '@angular/core';

import { DataStorageService } from '../shared/data-storage.service';
import { AlertService } from '../shared/alert/alert.service';
import { Alert } from '../shared/alert/alert.model';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
})
export class HeaderComponent {
  collapsed = true;

  constructor(
    private dataStorageService: DataStorageService, 
    private alertService: AlertService) {}

  onSaveData() {
    this.dataStorageService.storeRecipes()
    .subscribe(response => {
      this.alertService.addAlert(
        {
          type: 'success',
          title: 'Success!',
          message: 'Recipes saved succesfully!'
        });
    }, errorResponse => {
      let alert = new Alert('danger', 'Error! Cannot save data.', 'Unknown error.');

      switch(errorResponse.status) {
        case 400:
          alert = new Alert('danger', 'Error! Cannot save data.', 'Bad request.'); 
        break;
        case 401: 
          alert = new Alert('danger', 'Error! Cannot save data.', 'Unauthorized access to database.'); 
        break;
        case 403:
          alert = new Alert('danger', 'Error! Cannot save data.', 'Cannot save data. Database access forbidden.'); 
        break;
        case 404:
          alert = new Alert('danger', 'Error! Cannot save data.', 'Database not found.'); 
        break;
      }
      this.alertService.addAlert(alert);
    });
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes()
    .subscribe(recipes => {
      this.alertService.addAlert(
        {
          type: 'success',
          title: 'Success!',
          message: 'Recipes fetched succesfully!'
        });
    }, errorResponse => {
      let alert = new Alert('danger', 'Error! Cannot fetch data.', 'Unknown error.');

      switch(errorResponse.status) {
        case 400:
          alert = new Alert('danger', 'Error! Cannot fetch data.', 'Bad request.'); 
        break;
        case 401: 
          alert = new Alert('danger', 'Error! Cannot fetch data.', 'Unauthorized access to database.'); 
        break;
        case 403:
          alert = new Alert('danger', 'Error! Cannot fetch data.', 'Database access forbidden.'); 
        break;
        case 404:
          alert = new Alert('danger', 'Error! Cannot fetch data.', 'Database not found.'); 
        break;
      }
      this.alertService.addAlert(alert);
    });
  }

}
