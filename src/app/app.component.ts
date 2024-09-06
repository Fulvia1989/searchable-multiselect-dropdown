import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject, map, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MultiselectComponent } from './multiselect/multiselect.component';
import { MultiselectDropdownComponent } from './accessible-multiselect-dropdown/multiselect-dropdown.component';
import { OptionElement } from './accessible-multiselect-dropdown/models/select';
import { MaterialComponent } from "./accessible-multiselect-dropdown/material-style/material-style.component";
import { BootstrapItaliaComponent } from './accessible-multiselect-dropdown/bootstrap-italia-style/bootstrap-italia.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MultiselectDropdownComponent, AsyncPipe, MultiselectComponent, MaterialComponent,MaterialComponent,BootstrapItaliaComponent],
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
  private _filter(value: string, array:OptionElement[]): OptionElement[] {
    const filterValue = value.toLowerCase();
    return array.filter(el => el.label.toLowerCase().includes(filterValue));
  }
  filter$: BehaviorSubject<string|null> = new BehaviorSubject<string|null>(null);
  filteredOptions$  = this.filter$.pipe(
    startWith(null),
    map((el: string | null) => (el ? this._filter(el, this.options) : this.options.slice())),
    
  );
  
  updateList(value:string|null){
    this.filter$.next(value);
  }
  /**
   * Material Component
  */
  fruits:OptionElement[]=[
    {id:1, name:'apple',label:'Apple',isActiveDescendant:false,selected:false},
    {id:2, name:'banana',label:'Banana',isActiveDescendant:false,selected:false},
    {id:3, name:'grapes',label:'Grapes',isActiveDescendant:false,selected:false},
    {id:4, name:'strawberry',label:'Strawberry',isActiveDescendant:false,selected:false},
    {id:5, name:'pineapple',label:'Pineapple',isActiveDescendant:false,selected:false},
  ];
  fruitFilter$: BehaviorSubject<string|null> = new BehaviorSubject<string|null>(null);
  filteredFruits$  = this.fruitFilter$.pipe(
    startWith(null),
    map((el: string | null) => (el ? this._filter(el, this.fruits) : this.fruits.slice())),

  );
  updateFruitList(value:string|null){
    this.fruitFilter$.next(value);
  }

  /**
   * Bootstrap Component
   */
  vegetables:OptionElement[]=[
    {id:1, name:'zuchini',label:'Zuchini',isActiveDescendant:false,selected:false},
    {id:2, name:'artichokes',label:'Artichokes',isActiveDescendant:false,selected:false},
    {id:3, name:'rocket',label:'Rocket',isActiveDescendant:false,selected:false},
    {id:4, name:'cucumber',label:'Cucumber',isActiveDescendant:false,selected:false},
    {id:5, name:'fennel',label:'Fennel',isActiveDescendant:false,selected:false},
  ];
  veggieFilter$: BehaviorSubject<string|null> = new BehaviorSubject<string|null>(null);
  filteredVeggies$  = this.fruitFilter$.pipe(
    startWith(null),
    map((el: string | null) => (el ? this._filter(el, this.fruits) : this.fruits.slice())),

  );
  updateVeggiesList(value:string|null){
    this.veggieFilter$.next(value);
  }



}
