import { NgClass } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MultiselectDropdownComponent } from '../multiselect-dropdown.component';

@Component({
  selector: 'material-multiselect',
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: '../multiselect-dropdown.component.html',
  styleUrl: './material-style.component.scss'
})
export class MaterialComponent extends MultiselectDropdownComponent{
  

  


}
