import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemEditorComponent } from './item-editor/item-editor.component';
import { PageListComponent } from './page-list/page-list.component';
import { FormsModule } from '@angular/forms';
import { ReloadButtonComponent } from './reload-button/reload-button.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ItemListComponent,
    ItemEditorComponent,
    PageListComponent,
    ReloadButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
