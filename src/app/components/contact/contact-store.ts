import { Injectable } from '@angular/core';
import { List } from 'immutable';
import { createStore, Store } from 'redux';
import { reducer } from './reducer';
import { IContactAction } from './actions';

export class Contact {
  name: string;
  star: boolean;
  id: number;
}

@Injectable()
export class ContactStore {

  store: Store<any> = createStore(reducer, List<Contact>());

  get contacts(): List<Contact> {
    return this.store.getState();
  }

  dispatch(action: IContactAction): void {
    this.store.dispatch(<any>action);
  }
}