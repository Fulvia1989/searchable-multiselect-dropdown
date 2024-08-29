import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject, map, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MultiselectComponent } from './multiselect/multiselect.component';
import { MultiselectDropdownComponent } from './accessible-multiselect-dropdown/multiselect-dropdown.component';
import { OptionElement } from './accessible-multiselect-dropdown/models/select';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MultiselectDropdownComponent,AsyncPipe, MultiselectComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'multiselect-dropdown-search';
  options:OptionElement[]=[
    {id:1, name:'puns',label:'Puns',isActiveDescendant:false,selected:false},
    {id:2, name:'riddles',label:'Riddles',isActiveDescendant:false,selected:false},
    {id:3, name:'observations',label:'Observations',isActiveDescendant:false,selected:false},
    {id:4, name:'knock',label:'Knock-knock',isActiveDescendant:false,selected:false},
    {id:5, name:'one-liners',label:'One-liners',isActiveDescendant:false,selected:false},
  ];
  filter$: BehaviorSubject<string|null> = new BehaviorSubject<string|null>(null);
  filteredOptions$  = this.filter$.pipe(
    startWith(null),
    map((el: string | null) => (el ? this._filter(el, this.options) : this.options.slice())),

  );

  private _filter(value: string, array:OptionElement[]): OptionElement[] {
    const filterValue = value.toLowerCase();
    return array.filter(el => el.label.toLowerCase().includes(filterValue));
  }

  updateList(value:string|null){
    this.filter$.next(value);
  }
}
