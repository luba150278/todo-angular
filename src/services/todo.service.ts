import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItemsResponseInterface } from 'src/interfaces/todo.interface';
import instance from 'src/shared/request';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  httpOptions = instance();
  constructor(private http: HttpClient) {}

  async getItems(): Promise<ItemsResponseInterface> {
    try {
      const url = `${environment.apiUrl}/router?action=getItems1`;
      const source$ = this.http.post<ItemsResponseInterface>(
        url,
        {
          activeID: localStorage.getItem('activeID'),
        },
        this.httpOptions
      );

      return await lastValueFrom(source$);
    } catch (e) {
      return { items: [], error: 'Bad' };
    }
  }
}
