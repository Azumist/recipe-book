import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipesService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    this.http
    .put(
      'https://recipe-book-2742e-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
      recipes
    )
    .subscribe(response => {

    });
  }

  fetchRecipes() {
    this.http
    .get<Recipe[]>('https://recipe-book-2742e-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
    .subscribe(recipes => {
      // console.log(recipes);
      this.recipesService.setRecipes(recipes);
    })
  }
}