import { Injectable } from '@angular/core';
import { IItemRepository } from 'src/interfaces/IItemRepository';
import { ItemDto } from '../Dtos/dbDto';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemRepositoryWebApiService{

  url: string = "https://localhost:7044/api/v1/todoItems";

  // items: ItemDto[]  = [];

  constructor(private http: HttpClient) { }

  getItems(): Observable<ItemDto[]> {
    return this.http.get<ItemDto[]>(this.url);
  }
  getItemById(id: string): Observable<ItemDto> {
    return this.http.get<ItemDto>(this.url + `/${id}`);
  }
  updateItem(id: string, item: ItemDto): Observable<ItemDto> {
    return this.http.put<ItemDto>(this.url + `/${id}`, item);
  }
  CreateItem(item: ItemDto): Observable<ItemDto> {
    return this.http.post<ItemDto>(this.url, item);
  }
  DeleteItem(id: string): Observable<Object> {
    return this.http.delete(this.url + `/${id}`);
  }
}
