import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { TodoService } from 'src/services/todo.service';
import { PageEvent } from '@angular/material/paginator';
import { Item } from 'src/interfaces/todo.interface';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  items: Item[] = [];
  error = '';
  newTask = '';
  editId = '';
  editTask = '';
  pageSize = 5;
  pageIndex = 0;
  pageEvent: PageEvent = new PageEvent();

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

  editFunc(id: string): void {
    this.editId = id;
  }

  async saveFunc(checked: boolean): Promise<void> {
    const data = await this.service.changeItem(
      this.editId,
      checked,
      this.editTask
    );
    if (data.error || !data.ok) {
      this.error = data.error || 'Невідома помилка';
      return;
    }
    this.getItems();
    this.newTask = '';
    this.editId = '';
    this.editTask = '';
  }

  changeHandler(event: Event): void {
    this.editTask = (event.target as HTMLInputElement).value;
  }

  async keyHandler(event: KeyboardEvent, checked: boolean): Promise<void> {
    if (event.key === 'Enter') {
      await this.saveFunc(checked);
    }
  }

  drop(event: CdkDragDrop<Item[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }
}
