export interface IContactAction {
  type: string;
  id?: number;
  name?: string;
}

export function addContact(name: string, id: number): IContactAction {
  return {
    type: 'ADD',
    id: id,
    name: name
  };
}

export function removeContact(id: number): IContactAction {
  return {
    type: 'REMOVE',
    id: id
  };
}

export function starContact(id: number): IContactAction {
  return {
    type: 'STAR',
    id: id
  };
}

