import { NgClass } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KeyboardKey } from './models/keyboard';
import { OptionElement } from './models/select';

@Component({
  selector: 'multiselect-dropdown',
  standalone: true,
  imports: [
    NgClass,
    FormsModule
  ],
  templateUrl: './multiselect-dropdown.component.html',
  styleUrl: './multiselect-dropdown.component.scss'
})
export class MultiselectDropdownComponent {
  isDropdownOpen:boolean = false;
  filter:string='';
  currentOptionIndex:number = 0;

  options:OptionElement[]=[
    {id:0, name:'all',label:'Select All',isActiveDescendant:true,selected:false},
    {id:1, name:'puns',label:'Puns',isActiveDescendant:false,selected:false},
    {id:2, name:'riddles',label:'Riddles',isActiveDescendant:false,selected:false},
    {id:3, name:'observations',label:'Observations',isActiveDescendant:false,selected:false},
    {id:4, name:'knock',label:'Knock-knock',isActiveDescendant:false,selected:false},
    {id:5, name:'one-liners',label:'One-liners',isActiveDescendant:false,selected:false},
  ];

  @ViewChild('input') input!: ElementRef;
  @ViewChild('dropdown') dropdown!: ElementRef;

  @HostListener('document:click', ['$event'])
  handleDocumentInteraction = (event:any) => {

    const isClickInsideButton = this.input.nativeElement.contains(event.target);
    const isClickInsideDropdown = this.dropdown.nativeElement.contains(event.target);
  
    if (!isClickInsideButton && !isClickInsideDropdown && this.isDropdownOpen){
      this.toggleDropdown();
    }
  };

  toggleDropdown = () => {
    this.isDropdownOpen = !this.isDropdownOpen;
    if (this.isDropdownOpen) {
      this.focusCurrentOption();
    } else {

      this.input.nativeElement.focus();
    }
  };
  focusCurrentOption = () => {

    let itemId = `item${this.currentOptionIndex}`;
    const currentOption = document.getElementById(itemId);
    currentOption?.classList.add('current');
    currentOption?.focus();
    currentOption?.scrollIntoView({
      block: 'nearest',
    });
  
  };


  handleKeyPress = (event:KeyboardEvent) => {
    //event.preventDefault();
    console.log(event);
   const { key } = event;
   const openKeys:string[] = [KeyboardKey.Enter, KeyboardKey.Space];
 
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
      case KeyboardKey.Enter:
      case ' ':
        this.selectCurrentOption();
        break;
      default:
        break;
    }
  }
  };

  moveFocusDown = () => {
    // const elements = document.querySelectorAll('[role="option"]');

    if (this.currentOptionIndex < this.options.length - 1) {
      this.currentOptionIndex++;
    } else {
      this.currentOptionIndex = 0;
    };
    this.options.forEach(el =>{
      if(el.id == this.currentOptionIndex){
        el.isActiveDescendant=true;
      }else{
        el.isActiveDescendant=false;
      }
    });
 
    this.focusCurrentOption();
  };
  moveFocusUp = () => {
    const elements = document.querySelectorAll('[role="option"]');

    if (this.currentOptionIndex > 0) {
      this.currentOptionIndex--;
    } else {
      this.currentOptionIndex = elements.length - 1;
    }
    this.focusCurrentOption();
  };
  selectCurrentOption = () => {
    const elements = document.querySelectorAll('[role="option"]');

    const selectedOption = elements[this.currentOptionIndex];
    this.selectOptionByElement(selectedOption);
  };

  selectOptionByElement = (optionElement:any) => {
    console.log(optionElement);
    // const optionValue = optionElement.textContent;
     const elements = document.querySelectorAll('[role="option"]');
    // console.log(elements);

    // //elements.textContent = optionValue;
    elements.forEach(option => {
      option.classList.remove('active');
      option.setAttribute('aria-selected', 'false');
    });
  
     optionElement.classList.add('active');
     optionElement.setAttribute('aria-selected', 'true');
  }

  


}
