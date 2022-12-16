import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
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
  newTask = '';
  editItemId = '';
  editItemText = '';
  constructor(private service: TodoService) {}
  ngOnInit() {
    this.getItems();
  }
  async getItems(): Promise<void> {
    const data = await this.service.getItems();
    if (data.error) {
      this.error = data.error + 'Не знайдено токен';
      return;
    }
    this.items = data.items;
    this.error = '';
    this.newTask = '';
    this.editItemId = '';
    this.editItemText = '';
  }
  async addFunc(): Promise<void> {
    const data = await this.service.addItem(this.newTask);
    if (data.error) {
      this.error = data.error;
      return;
    }
    this.getItems();
  }
  async deleteFunc(id: string): Promise<void> {
    const data = await this.service.deleteItem(id);
    if (data.error || !data.ok) {
      this.error = data.error || 'Невідома помилка';
      return;
    }
    this.getItems();
  }

  async changeFunc(id: string, checked: boolean): Promise<void> {
    const text = this.items.find((item) => item.id === id)?.text;
    if (!text) {
      this.error = 'Запис з таким id не знайдено ';
      return;
    }
    const data = await this.service.changeItem(id, !checked, text);
    if (data.error || !data.ok) {
      this.error = data.error || 'Невідома помилка';
      return;
    }
    this.getItems();
  }

  chahgeFieldFunc(id: string): void {
    this.editItemId = id;
  }

  changeVal(event: Event) {
    this.editItemText = (event.target as HTMLInputElement).value;
  }

  async saveFunc(checked: boolean): Promise<void> {
    const data = await this.service.changeItem(
      this.editItemId,
      checked,
      this.editItemText
    );
    if (data.error || !data.ok) {
      this.error = data.error || 'Невідома помилка';
      return;
    }
    this.getItems();
  }

  onKey(event: KeyboardEvent, checked: boolean) {
    if (event.key === 'Enter') {
      this.saveFunc(checked);
    }
  }

  drop(event: CdkDragDrop<Item[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }
}
