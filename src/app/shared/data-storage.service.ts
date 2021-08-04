import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { Alert } from "./alert/alert.model";
import { AlertService } from "./alert/alert.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipesService: RecipeService,
    private alertService: AlertService) {}

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    this.http
    .put(
      'https://recipe-book-2742e-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
      recipes
    )
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

  fetchRecipes() {
    this.http
    .get<Recipe[]>('https://recipe-book-2742e-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
    .subscribe(recipes => {
      this.recipesService.setRecipes(recipes);
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