import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { GridApi, ColDef } from 'ag-grid-community';
import { ContactsService } from '../services/contacts.service';
import { Contact } from '../models/contact.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListView } from '../../../../shared/utils/list-view';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent extends ListView<Contact> implements OnInit {

  @ViewChild('editContact')
  editContactTemplate!: TemplateRef<any>;
  contactData: Contact | null = null;
  entityName = "Contacts"
  columnDefs: ColDef<Contact>[] = [
    { field: 'name', headerName: 'Name', editable: true },
    { field: 'phoneNumber', headerName: 'Phone', editable: true, },
    { headerName: 'Actions', cellRenderer: this.actionCellRenderer.bind(this) }
  ];

  rowData: Contact[] = [];
  closeResult = '';

  constructor(private _contactsService: ContactsService, private _modalService: NgbModal) {
    super();
  }


  ngOnInit() {
    this.loadContacts();
  }


  loadContacts() {
    this._contactsService.getContacts().subscribe((contacts) => {
      this.rowData = contacts;
      this._gridApi?.refreshCells();
    });
  }

  // TODO, this is bad practice, but created an component for cell rendering in the table will take long time
  actionCellRenderer(params: any) {
    const editButton = `<button class="edit-button btn btn-primary">Edit</button>`;
    const deleteButton = `<button class="delete-button btn btn-danger">Delete</button>`;

    const container = document.createElement('div');
    container.innerHTML = editButton + deleteButton;

    const editBtn = container.querySelector('.edit-button');
    const deleteBtn = container.querySelector('.delete-button');
    editBtn?.addEventListener('click', () => this.openAddEditModal(params.data));
    deleteBtn?.addEventListener('click', () => this.deleteContact(params.data.id));

    return container;
  }
  openAddEditModal(contactData?: Contact) {
    this.contactData = contactData || null;
    this._modalService.open(this.editContactTemplate);
  }


  deleteContact(id: string) {
    this._contactsService.deleteContact(id).subscribe({
      next: () => {
        this.loadContacts();
      }
    });
  }
  contactAddedUpdated() {
    this._modalService.dismissAll();
    this.loadContacts();
  }
}
