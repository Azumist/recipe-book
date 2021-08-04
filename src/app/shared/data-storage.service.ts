import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";

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
    return this.http
    .put(
      'https://recipe-book-2742e-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
      recipes
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
      })
    );
  
  }
}