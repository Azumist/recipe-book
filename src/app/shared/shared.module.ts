import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { ShortenPipe } from "./shorten.pipe";

@NgModule({
  declarations: [
    DropdownDirective,
    ShortenPipe,
    AlertComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DropdownDirective,
    ShortenPipe,
    AlertComponent,
    LoadingSpinnerComponent,
  ]
})
export class SharedModule {

}