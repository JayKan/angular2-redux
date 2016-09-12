import { ContactStore } from './contact-store';
import { ContactList } from './contact-list';
import { Contact } from './contact';

export const CONTACT_STORE_PROVIDERS: any[] = [
  ContactStore
];

export const CONTACT_DIRECTIVES: any[] = [
  Contact,
  ContactList
];




