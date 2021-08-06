import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';

import { AppRoutingModule } from './app-routing.module';
import { RecipesModule } from './recipes/recipes.module';
import { SharedModule } from './shared/shared.module';

// import { RecipeService } from './recipes/recipe.service';
// import { ShoppingListService } from './shopping-list/shopping-list.service';
// import { AlertService } from './shared/alert/alert.service';
// import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { CoreModule } from './core.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    RecipesModule,
    ShoppingListModule,
    CoreModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
