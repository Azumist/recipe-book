import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { AuthComponent } from './auth/auth.component';
import { AlertComponent } from './shared/alert/alert.component';

import { AppRoutingModule } from './app-routing.module';
import { RecipesModule } from './recipes/recipes.module';

import { RecipeService } from './recipes/recipe.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AlertService } from './shared/alert/alert.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

// import { DropdownDirective } from './shared/dropdown.directive';

// import { ShortenPipe } from './shared/shorten.pipe';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    // DropdownDirective,
    AlertComponent,
    AuthComponent,
    // ShortenPipe,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    RecipesModule
  ],
  providers: [
    ShoppingListService,
    RecipeService,
    AlertService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
