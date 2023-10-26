import { Component } from '@angular/core';
import { ItemDto } from '../Dtos/dbDto';
import { ItemRepositoryLocal } from '../services/item-repository.service';
import { ItemRepositoryWebApiService } from '../services/item-repository-web-api.service';
import { Observable, tap } from 'rxjs';
import { ToDoListService } from '../services/to-do-list.service';
import { ItemEventObj } from '../item-list/item-list.component';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent {

  itemList: ItemDto[] | undefined;
  itemListPartial: ItemDto[] | undefined;

  itemObserve: Observable<ItemDto[]> | undefined;

  inputStr: string = "";

  constructor(
    private toDoListService: ToDoListService
    ){}

  ngOnInit(){
    this.refresh()
  }

  refresh(){
    this.itemObserve = this.toDoListService.getAllItems();
  }

  reload(){
    this.toDoListService.reload();
    this.inputStr = "";
  }

  searchStr(searchText: string){
    this.inputStr = searchText;
    this.toDoListService.searchStr(searchText);
  }

  sortByDescription(){
    this.toDoListService.sortByDescription();
  }

  sortByTime(){
    this.toDoListService.sortByTime();
  }

  hideDone(){
    this.toDoListService.hideDone();
  }

  catchDoneEvent(event: ItemEventObj){
    let item = this.toDoListService.getItemById(event.id);
    if (item === undefined){
      return;
    }
    item = {...item};
    item.done = event.checked;
    this.toDoListService.updateItem(event.id, item);
  }

  catchLikeEvent(event: ItemEventObj){
    let item = this.toDoListService.getItemById(event.id);
    if (item === undefined){
      return;
    }
    item = {...item};
    item.favorite = event.checked;
    this.toDoListService.updateItem(event.id, item);
  }
}
