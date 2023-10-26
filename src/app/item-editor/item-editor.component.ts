import { Component, EventEmitter, Output,  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemDto } from '../Dtos/dbDto';
import { ItemRepositoryLocal } from '../services/item-repository.service';
import { ItemRepositoryWebApiService } from '../services/item-repository-web-api.service';
import { ToDoListService } from '../services/to-do-list.service';

@Component({
  selector: 'app-item-editor',
  templateUrl: './item-editor.component.html',
  styleUrls: ['./item-editor.component.css']
})
export class ItemEditorComponent {

  item: ItemDto = this.getNewItem();
  isNew: boolean = true;

  @Output()
  updateEvent = new EventEmitter<boolean>();

  constructor(private route: ActivatedRoute, private toDoListService: ToDoListService){
  }

  ngOnInit(){
    this.item = this.getNewItem();
    this.getItem();
  }

  modifyLike(event:any){
    this.item.favorite = !this.item.favorite;
  }

  saveItem(){
    if (!this.isNew){
      this.toDoListService.updateItem(this.item.id,this.item);
    }else{
      this.toDoListService.createItem(this.item);
    }
  }

  deleteItem(){
    this.toDoListService.deleteItem(this.item.id);
  }

  getNewItem(): ItemDto{
    return {
      id: '',
      done: false,
      favorite: false,
      title: "default title",
      description: "default content",
      createdTime: Date.now(),
      updatedTime: Date.now(),
    };
  }

  getItem(): void{
    const idStr = this.route.snapshot.paramMap.get('id');

    if (idStr != null){
    {
      this.isNew = false;
      let _item = this.toDoListService.getItemById(idStr);
      if (_item){
        this.item = {..._item};
      }
    }
  }
}
}
