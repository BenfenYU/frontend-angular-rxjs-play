import { ItemDto } from "src/app/Dtos/dbDto";

export interface IItemRepository{
    /**
     * 
     */
    getItems(): ItemDto[];

    getItemById(id: string): ItemDto | undefined;

    UpdateItem(id: string, item: ItemDto): void;

    CreateItem(item:ItemDto): ItemDto;

    DeleteItem(id: string): number;
}