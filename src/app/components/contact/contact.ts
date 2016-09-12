import { Component, ViewEncapsulation, Input, ChangeDetectionStrategy } from '@angular/core';
import { ContactStore, Contact as ContactModel } from './contact-store';
import { removeContact, starContact } from './actions';

@Component({
  selector: 'contact',
  encapsulation: ViewEncapsulation.None,
  template: require('./contact.html'),
  styles: [
    require('./contact.scss')
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Contact {

  @Input()
  data: ContactModel;

  constructor(private _store: ContactStore) { }

  removeContact(contact: ContactModel): void {
    this._store.dispatch(removeContact(contact.id));
  }

  starContact(contact: ContactModel): void {
    this._store.dispatch(starContact(contact.id));
  }
}

