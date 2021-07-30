import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;
  @HostListener('document:click', ['$event']) toggleDropdown(event: Event) {
    //elRef - element with the directive (i.e dropdown list), event.target - clicked element
    //this enables to close dropdown by clicking anywhere in the document
    this.isOpen = this.elRef.nativeElement.contains(event.target)
      ? !this.isOpen
      : false;
  }
  //   @HostListener('click') toggleDropdown() {
  //     this.isOpen = !this.isOpen;
  //   }
  constructor(private elRef: ElementRef) {}
}
