export interface ListItemInterface {
  id: string;
  description: string;
  completed: boolean;
}

export default class ListItem implements ListItemInterface {
  id: string = "";
  description: string = "";
  completed: boolean = false;
  constructor(id: string, description: string, completed: boolean) {
    this.id = id;
    this.description = description;
    this.completed = completed;
  }
}
