import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { ItemRepositoryLocal } from '../services/item-repository.service';
import { ItemDto } from '../Dtos/dbDto';
import { ItemRepositoryWebApiService } from '../services/item-repository-web-api.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent  {

  @Input()
  itemListPartial: ItemDto[] | undefined;

  constructor(
    private itemRepository: ItemRepositoryWebApiService
  ){}  

  modifyCheck(event:any){
    let _id = event.srcElement.id;
    let index = this.itemListPartial?.findIndex(x => x.id === String(_id));
    if (this.itemListPartial![index!]){
      this.itemRepository.updateItem(_id,this.itemListPartial![index!]).subscribe(item => this.itemListPartial![index!] = item);
    }
  }

  modifyLike(event:any){

    let _id = event.srcElement.id;
    let item = this.itemListPartial?.find(x => x.id === String(_id));
    if (item){
      item!.favorite = !item!.favorite;
      this.itemRepository.updateItem(_id, item).subscribe();
    }
  }
}
