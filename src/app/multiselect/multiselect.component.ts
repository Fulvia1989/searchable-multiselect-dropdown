import { Component, Input } from '@angular/core';
import { OptionElement } from '../accessible-multiselect-dropdown/models/select';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'multiselect',
  standalone: true,
  imports: [FormsModule,NgClass],
  templateUrl: './multiselect.component.html',
  styleUrl: './multiselect.component.scss'
})
export class MultiselectComponent {
  @Input() options:OptionElement[] =[];
  openDropdown:boolean =false;


}
