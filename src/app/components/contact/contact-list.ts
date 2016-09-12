import { Component, ViewEncapsulation } from '@angular/core';
import { ContactStore } from './contact-store';
import { addContact } from './actions';

@Component({
  selector: 'contact-list',
  encapsulation: ViewEncapsulation.None,
  template: require('./contact-list.html'),
  styles:[
    require('./contact-list.scss')
  ]
})
export class ContactList {

  contactID: number;

  constructor(private _store: ContactStore) {
    this.contactID = 0;
  }

  addContact(name: string): void {
    this._store.dispatch(addContact(name, this.contactID++));
  }
}