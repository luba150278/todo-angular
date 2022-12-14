import { Component } from '@angular/core';
import { TodoService } from 'src/services/todo.service';
import instance from 'src/shared/request';

type Item = {
  text: string;
  id: string;
  checked: boolean;
};
type ItemsResponseInterface = {
  items: Item[];
};

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  httpOptions = instance();
  items: Item[] = [];
  error = '';
  constructor(private service: TodoService) {}
  ngOnInit() {
    this.getItems();
  }
  async getItems(): Promise<void> {
    const data = await this.service.getItems();
    console.log(data);
    if (data.items && !data.error) {
      this.items = data.items;
      return;
    }

    this.error = data.error || 'Помилка сервера';
  }
}
