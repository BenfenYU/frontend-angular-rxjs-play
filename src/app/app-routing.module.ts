import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemEditorComponent } from './item-editor/item-editor.component';
import { PageListComponent } from './page-list/page-list.component';

const routes: Routes = [
  {path: 'editor', component: ItemEditorComponent},
  {path: 'editor/:id', component: ItemEditorComponent},
  {path: 'pagemain', component: PageListComponent},
  {path: '', redirectTo: 'pagemain', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
