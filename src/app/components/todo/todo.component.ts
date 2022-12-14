import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
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
    if (data.items) {
      this.items = data.items
      return;
    }

    this.error="Помилка сервера"

  }
}
