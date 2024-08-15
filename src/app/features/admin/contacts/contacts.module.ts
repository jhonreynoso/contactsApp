import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsPageComponent } from './contacts-page.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { RecordsComponent } from './records/records.component';
import { AgGridModule } from 'ag-grid-angular';
import { ContactsRoutingModule } from './contacts-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ContactsPageComponent, RecordsComponent, AddEditComponent],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    AgGridModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class ContactsModule { }
