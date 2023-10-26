import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Input()
  searchStr: string | undefined;

  @Output() 
  newItemEvent = new EventEmitter<string>();

  onSearchStrChange(){
    this.newItemEvent.emit(this.searchStr);
  }

}
