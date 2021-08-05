import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError, exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipesService: RecipeService,
    private authService: AuthService
  ) {}

  private handleErrors(errorResponse: HttpErrorResponse, operation: string) {
    let error = {
      type: 'danger',
      title: `${operation}`,
      message: 'Unknown error.'
    };

    // console.log(errorResponse);
    switch(errorResponse.status) {
      case 400:
        error.message = 'Bad request.';
      break;
      case 401:
        error.message = 'Unauthorized access.';
      break;
      case 403:
        error.message = 'Access forbidden.';
      break;
      case 404:
        error.message = 'Database not found.';
      break;
    }
    return throwError(error);
  }

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    return this.http
    .put(
      'https://recipe-book-2742e-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
      recipes
    )
    .pipe(
      catchError(errorResponse => this.handleErrors(errorResponse, 'Cannot save data on the server.'))
    );
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>('https://recipe-book-2742e-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {...recipe, ingredient: recipe.ingredients ? recipe.ingredients : []};
          })
        }),
        tap(recipes => {
          this.recipesService.setRecipes(recipes);
        }),
        catchError(errorResponse => this.handleErrors(errorResponse, 'Cannot fetch data from the server.'))
      );
  }
}