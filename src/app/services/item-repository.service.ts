import { Injectable } from '@angular/core';
import { ItemDto } from '../Dtos/dbDto';
import {v4 as uuidv4} from 'uuid';
import { IItemRepository } from 'src/interfaces/IItemRepository';

import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ItemRepositoryLocal implements IItemRepository {

  items: ItemDto[] = [
    {
        "id": "717ff531-41e9-47c0-98ed-74643b1eab12",
        "done": false,
        "favorite": false,
        "title": "title1",
        "description": "first",
        "createdTime": 1697457639659,
        "updatedTime": 1697457639659
    },
    {
        "id": "a4b4c280-5775-4611-b56b-d63c9d81142c",
        "done": true,
        "favorite": false,
        "title": "title2",
        "description": "second",
        "createdTime": 1697457649281,
        "updatedTime": 1697457649281
    },
    {
        "id": "1474da02-65ea-40e3-b6f9-664e5f7b2a25",
        "done": false,
        "favorite": false,
        "title": "title3",
        "description": "Last",
        "createdTime": 1697457664898,
        "updatedTime": 1697457664898
    }
];

  fileUrl = "../assets/items.json"

  constructor(private http: HttpClient) { }

  CreateItem(item: ItemDto): ItemDto {
      let newItem = {...item};
      newItem.id = uuidv4();
      this.items.push(newItem);

      return newItem;
  }

  getItems(): ItemDto[]{
    // this.http.get<ItemDto[]>(this.fileUrl).subscribe(items => this.items = {...items});
    // console.log(this.items);
    // return this.items;
    return this.items;
    // this.flush();
  }

  getItemById(id: string){
    return this.items.find(i => i.id === id);
  }

  UpdateItem(id: string, item: ItemDto): void{
    let index = this.items.findIndex(i => i.id === id);
    if (index === -1){
      this.CreateItem(item);
    }else{
      this.items[index] = {...item};
    }

    // console.log(this.items);
    // this.flush();
    // this.http.post<ItemDto[]>(this.fileUrl, this.items).subscribe();
  }

  DeleteItem(id: string){
    let index = this.items.findIndex(i => i.id === id);
    if (index == -1){
      return 0;
    }
    this.items = this.items.filter((e,i,a)=>e.id!=id);
    // this.flush();
    return 1;
  }

  // private flush(){
  //   fs.writeFileSync(this.fileUrl, JSON.stringify(this.items));
  // }
}
