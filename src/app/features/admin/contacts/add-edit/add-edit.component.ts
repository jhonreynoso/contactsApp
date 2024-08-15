import { Component, EventEmitter, Input, OnInit, Output, input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ContactsService } from '../services/contacts.service';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  form: FormGroup;
  isRequestInProgress = false;
  formType: 'ADD' | 'EDIT' = 'ADD';
  @Input() contactData: Contact | any = null;
  @Output() contactAddedUpdated = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private _contactsService: ContactsService,
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
    });
  }

  ngOnInit(): void {
    if (this.contactData) {
      this.formType = 'EDIT';
      this.form.patchValue({
        name: this.contactData.name,
        phoneNumber: this.contactData.phoneNumber
      });
    }
  }

  onSave() {
    if (this.form.valid) {
      this.isRequestInProgress = true;
      const contactData = this.form.value;

      const saveObservable = this.formType === 'EDIT'
        ? this._contactsService.updateContact({ ...contactData, id: this.contactData.id })
        : this._contactsService.createContact(contactData);

      saveObservable.subscribe({
        next: () => {
          this.contactAddedUpdated.emit()
          this.isRequestInProgress = false;
        },
        error: () => {
          this.contactAddedUpdated.emit()
        }
      });
    }
  }

  onCancel() {
    this.contactAddedUpdated.emit()
  }
}
