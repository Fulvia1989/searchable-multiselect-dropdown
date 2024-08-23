import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MultiselectDropdownComponent } from './multiselect-dropdown/multiselect-dropdown.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MultiselectDropdownComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'multiselect-dropdown-search';
}
