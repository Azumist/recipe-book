import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  loadedSection = 'recipes';

  onNavigate(section: string) {
    //console.log(section);
    this.loadedSection = section;
  }
}
