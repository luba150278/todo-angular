import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
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
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.getItems();
  }
  getItems(): void {
    //console.log('sdasdad');
    const url = `${environment.apiUrl}/router?action=getItems`;
    this.http
      .post<ItemsResponseInterface>(
        url,
        {
          activeID: localStorage.getItem('activeID'),
        },
        this.httpOptions
      )
      .pipe(map((data) => data))
      .subscribe({
        next: (data) => {
          this.items = data.items;
        },
        error: (e) => {
          this.error = `Server error: ${e.message}`;
        },
      });
  }
}
