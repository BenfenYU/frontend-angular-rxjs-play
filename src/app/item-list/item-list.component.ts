import { Component, Input, OnChanges, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { ItemRepositoryLocal } from '../services/item-repository.service';
import { ItemDto } from '../Dtos/dbDto';
import { ItemRepositoryWebApiService } from '../services/item-repository-web-api.service';
import { Observable } from 'rxjs';
import { EventEmitter } from '@angular/core';

export interface ItemEventObj{
  id: string;
  checked: boolean;
}

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnChanges {

  // @Input()
  // itemListPartial: ItemDto[] | undefined;

  // @Input()
  // itemToDoList?: Observable<ItemDto[]>;

  @Input()
  id: string = '';
  @Input()
  done?: boolean;
  @Input()
  title?: string;
  @Input()
  favorite?: boolean;

  @Output()
  doneEvent = new EventEmitter<ItemEventObj>();
  @Output()
  likeEvent = new EventEmitter<ItemEventObj>();

  constructor(){}  

  ngOnChanges(changes: SimpleChanges): void {
    for(let name in changes){
      if (name === "favorite"){
        // console.log(changes[name]);
      }
    }
  }

  modifyCheck(event:any){
    // console.log(event);
    // console.log(event.target.checked);
    let eventObj = {
      id : this.id,
      checked: event.target.checked
    };
    this.doneEvent.emit(eventObj);
    // let _id = event.srcElement.id;
    // let index = this.itemListPartial?.findIndex(x => x.id === String(_id));
    // if (this.itemListPartial![index!]){
    //   this.itemRepository.updateItem(_id,this.itemListPartial![index!]).subscribe(item => this.itemListPartial![index!] = item);
    // }
  }

  modifyLike(event:any){

    // console.log(event);
    // console.log(event.type);
    let eventObj = {
      id: this.id,
      checked: !this.favorite
    }
    if (event.type === "click"){
      this.likeEvent.emit(eventObj);
    }
    // let _id = event.srcElement.id;
    // let item = this.itemListPartial?.find(x => x.id === String(_id));
    // if (item){
    //   item!.favorite = !item!.favorite;
    //   this.itemRepository.updateItem(_id, item).subscribe();
    // }
  }
}
