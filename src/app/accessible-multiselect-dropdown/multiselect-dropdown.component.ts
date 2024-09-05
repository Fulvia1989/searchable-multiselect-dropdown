import { NgClass } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KeyboardKey } from './models/keyboard';
import { OptionElement } from './models/select';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs';

@Component({
  selector: 'multiselect-dropdown',
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './multiselect-dropdown.component.html',
  styleUrl: './multiselect-dropdown.component.scss'
})
export class MultiselectDropdownComponent {
  isDropdownOpen:boolean = false;
  filter:FormControl = new FormControl<string>('');
  currentOptionIndex:number = 0;

  selected:OptionElement[] =[];
  options:OptionElement[]=[];
  @Input() label:string ='select';
  @Input() set filteredElements(value:OptionElement[]){
    this.currentOptionIndex = 0;
    this.options = [   
       {id:0, name:'all',label:'Select All',isActiveDescendant:true,selected:false},
    ].concat(value);
  };
  
  @Output() filterValueChange: EventEmitter<string | null> = new EventEmitter();
  @Output() selectedChange: EventEmitter<OptionElement[]> = new EventEmitter();

  @ViewChild('input') input!: ElementRef;
  @ViewChild('dropdown') dropdown!: ElementRef;

  @HostListener('document:click', ['$event'])
  handleDocumentInteraction = (event:any) => {

    const isClickInsideButton = this.input.nativeElement.contains(event.target);
    const isClickInsideDropdown = this.dropdown.nativeElement.contains(event.target);
  
    console.log(isClickInsideButton);
    if (!isClickInsideButton && !isClickInsideDropdown && this.isDropdownOpen){
      this.toggleDropdown();
    }
  };

  constructor(){}
  ngOnInit(): void {
   this.filter.valueChanges.pipe(
    startWith(''),
    distinctUntilChanged()
   ).subscribe(
    value => {
      console.log(value)
      this.filterValueChange.emit(value);

    }
   )
    
  }

  toggleDropdown = () => {
    this.isDropdownOpen = !this.isDropdownOpen;
    if (this.isDropdownOpen) {
      this.focusCurrentOption();
    } else {

      this.input.nativeElement.focus();
    }
  };
  focusCurrentOption = () => {
    let currentEl = this.options[this.currentOptionIndex];
    let itemId = `item-${currentEl.name}-${this.currentOptionIndex}`;
    const currentOption = document.getElementById(itemId);
    console.log(currentOption);
    currentOption?.focus();
    currentOption?.scrollIntoView({
      //block: 'nearest',
      behavior: 'smooth',
      block: 'center'
    });
  
  };


  handleKeyPress = (event:KeyboardEvent) => {
    //event.preventDefault();
   const { key } = event;
   const openKeys:string[] = [KeyboardKey.Enter];
 
   if (!this.isDropdownOpen && openKeys.includes(key) || (this.isDropdownOpen && key === KeyboardKey.Escape)) {
     this.toggleDropdown();
   }else if (this.isDropdownOpen) {
    switch (key) {
      case KeyboardKey.Escape:
        this.toggleDropdown();
        break;
      case KeyboardKey.ArrowDown:
        this.moveFocusDown();
        break;
      case KeyboardKey.ArrowUp:
        this.moveFocusUp();
        break;
      case ' ':
        this.selectCurrentOption(event);
        break;
      default:
        break;
    }
  }
  };

  moveFocusDown = () => {

    if (this.currentOptionIndex < this.options.length - 1) {
      this.currentOptionIndex++;
    } else {
      this.currentOptionIndex = 0;
    };
    this.options.forEach((el,i) =>{
      if(i == this.currentOptionIndex){
        el.isActiveDescendant=true;
      }else{
        el.isActiveDescendant=false;
      }
    });
 
    this.focusCurrentOption();
  };
  moveFocusUp = () => {

    if (this.currentOptionIndex > 0) {
      this.currentOptionIndex--;
    } else {
      this.currentOptionIndex = this.options.length - 1;
    }
    this.options.forEach(el =>{
      if(el.id == this.currentOptionIndex){
        el.isActiveDescendant=true;
      }else{
        el.isActiveDescendant=false;
      }
    });
    this.focusCurrentOption();
  };
  

  selectCurrentOption = (event:KeyboardEvent) => {
    event.preventDefault();
    let currentEl = this.options[this.currentOptionIndex];
    currentEl.selected=!currentEl.selected;

    if(!this.currentOptionIndex){
      this.options.forEach(el => el.selected = currentEl.selected);
      this.selected = [...this.options.filter(el => el.selected)];
    }else{
      if(currentEl.selected){
        this.selected.push(currentEl);
      }else{
        this.selected = this.selected.filter(el => el.id !== currentEl.id);
      }
    };
    this.selectedChange.emit(this.selected);
 


  };


  


}
