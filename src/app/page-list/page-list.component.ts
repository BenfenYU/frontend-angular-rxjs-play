import { Component } from '@angular/core';
import { ItemDto } from '../Dtos/dbDto';
import { ItemRepositoryLocal } from '../services/item-repository.service';
import { ItemRepositoryWebApiService } from '../services/item-repository-web-api.service';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent {

  itemList?: ItemDto[];
  itemListPartial?: ItemDto[];

  constructor(private itemRepository: ItemRepositoryWebApiService){}

  ngOnInit(){
    this.reload(); 
  }

  reload(){
    this.itemRepository.getItems().subscribe(
      items => 
      {
        this.itemList = items;
        this.itemListPartial = this.itemList;
      }
      );
  }

  searchStr(searchText: string){
    if (searchText == undefined || this.itemList == undefined){
      return;
    }
    if (searchText === ''){
      this.itemListPartial = this.itemList;
      return;
    }
    this.itemListPartial = this.itemList.filter((e,i,a) => 
    {
      let isOk = e.title.includes(searchText);
      return isOk;
    });
  }

  sortByDescription(){
    this.itemListPartial = this.itemList;
    this.itemListPartial = this.itemListPartial?.sort((a,b) => (a.description > b.description ? -1: 1));
  }

  sortByTime(){
    this.itemListPartial = this.itemList;
    this.itemListPartial = this.itemListPartial?.sort((a,b) => (a.createdTime > b.createdTime ? -1: 1));
  }

  hideDone(){
    this.itemListPartial = this.itemList;
    this.itemListPartial = this.itemListPartial?.filter((e,i,a) => !e.done);
  }
}
