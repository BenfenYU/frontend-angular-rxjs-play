import { Component, EventEmitter, Output,  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemDto } from '../Dtos/dbDto';
import { ItemRepositoryLocal } from '../services/item-repository.service';
import { ItemRepositoryWebApiService } from '../services/item-repository-web-api.service';

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

  constructor(private route: ActivatedRoute, private itemRepository: ItemRepositoryWebApiService){
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
      this.itemRepository.updateItem(this.item.id,this.item).subscribe();
    }else{
      this.itemRepository.CreateItem(this.item).subscribe();
    }
  }

  deleteItem(){
    this.itemRepository.DeleteItem(this.item.id).subscribe();
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
      this.itemRepository.getItemById(idStr).subscribe(item => this.item = item);
    }
  }
}
}
