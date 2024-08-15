import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsPageComponent } from './contacts-page.component';
import { AddEditComponent } from './add-edit/add-edit.component';

const routes: Routes = [
  { path: '', component: ContactsPageComponent },
  {
    path: 'add',
    component: AddEditComponent
  },
  {
    path: 'edit:id',
    component: AddEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
