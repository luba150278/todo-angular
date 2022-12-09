import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import instance from 'src/shared/request';

interface RegResponseInterface {
  ok: boolean;
  alreadyExist: true;
}

interface LoginResInterface {
  token: string;
  activeID: string;
  ok: boolean;
  error?: string;
}

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss'],
})
export class RegComponent {
  httpOptions = instance();
  login: string = '';
  pass: string = '';
  error: string = '';
  @Input() activeID = '';
  constructor(private http: HttpClient) {}

  regFunc(): void {
    if (this.login === '' || this.pass === '') {
      this.error = 'Пусте значення';
      return;
    }
    const url = `${environment.apiUrl}/router?action=register`;
    const res = this.http
      .post<RegResponseInterface>(
        url,
        { login: this.login, pass: this.pass },
        this.httpOptions
      )
      .pipe(map((data) => data))
      .subscribe({
        next: (data) => {
          if (data.ok && data.alreadyExist) {
            this.error = 'Такий користувач вже зареэстрований';
            return;
          }

          if (data.ok && !data.alreadyExist) {
            this.loginFunc();
            return;
          }
          this.error = 'Такий користувач не зареэстрований';
        },
        error: (e) => {
          this.error = `Server error + ${e.message}`;
        },
      });
  }

  loginFunc(): void {

    const url = `${environment.apiUrl}/router?action=login`;
    this.http
      .post<LoginResInterface>(
        url,
        { login: this.login, pass: this.pass },
        this.httpOptions
      )
      .pipe(map((data) => data))
      .subscribe({
        next: (data) => {
          if (data.token !== '' && data.activeID !== '') {
            this.activeID = data.activeID;
            localStorage.setItem('token', data.token);
            localStorage.setItem('activeID', data.activeID);

            return;
          }
          this.error = 'Такий користувач не зареэстрований';
        },
        error: (e) => {
          this.error = `Server error + ${e.message}`;
        },
      });

  }
}
