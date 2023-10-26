import { Injectable } from '@angular/core';
import { ItemRepositoryWebApiService } from './item-repository-web-api.service';
import { Observable, Subject } from 'rxjs';
import { ItemDto } from '../Dtos/dbDto';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {

  items: ItemDto[] = [];
  itemsView: ItemDto[] = [];

  itemsSubjector: Subject<ItemDto[]> = new Subject<ItemDto[]>();

  constructor(private itemRepository: ItemRepositoryWebApiService) { }

  ngOnInit(){
    
  }

  public getAllItems(): Observable<ItemDto[]>{
    let itemsObserve = this.itemRepository.getItems();
    itemsObserve.subscribe(
      _items => {
        this.items = _items;
        this.itemsView = _items.slice();
        this.itemsSubjector.next(this.items);
      }
    )
    
    return this.itemsSubjector;
  }

  public updateItem(id: string, item: ItemDto): void{
    this.itemRepository.updateItem(id, item).subscribe(_ => this.getAllItems());
  }

  public createItem(item:ItemDto):void{
    this.itemRepository.CreateItem(item).subscribe(_ => this.getAllItems());
  }

  public deleteItem(id: string): void{
    this.itemRepository.DeleteItem(id).subscribe(_ => this.getAllItems());
  }

  public getItemById(id: string) : ItemDto | undefined{
    return this.items.find(_item => _item.id === id);
  }

  searchStr(searchText: string):void{
    if (searchText == undefined || this.itemsView == undefined){
      return;
    }
    if (searchText === ''){
      this.itemsView= this.items.slice();
      this.itemsSubjector.next(this.itemsView);
      return;
    }
    this.itemsView = this.items.filter((e,i,a) => 
    {
      let isOk = e.title.includes(searchText);
      return isOk;
    });
    this.itemsSubjector.next(this.itemsView);
  }

  sortByDescription(){
    // this.itemsView = this.items.slice();
    this.itemsView.sort((a,b) => (a.description > b.description ? -1: 1));
    this.itemsSubjector.next(this.itemsView);
  }

  sortByTime(){
    // this.itemsView = this.items.slice();
    this.itemsView= this.itemsView.sort((a,b) => (a.createdTime > b.createdTime ? -1: 1));
    this.itemsSubjector.next(this.itemsView);
  }

  hideDone(){
    this.itemsView= this.items.filter((e,i,a) => !e.done);
    this.itemsSubjector.next(this.itemsView);
  }

  reload(){
    this.itemsView = this.items.slice();
    this.itemsSubjector.next(this.itemsView);
  }
}
