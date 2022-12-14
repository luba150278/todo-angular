import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  LoginResInterface,
  RegResponseInterface,
} from 'src/interfaces/auth.interface';
import instance from 'src/shared/request';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpOptions = instance();
  activeID = '';
  error = '';
  constructor(private http: HttpClient) {}

  async login(login: string, pass: string): Promise<LoginResInterface> {
    const url = `${environment.apiUrl}/router?action=login`;
    const source$ = this.http.post<LoginResInterface>(
      url,
      { login, pass },
      this.httpOptions
    );
    const data = await lastValueFrom(source$);
    if (data.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('activeID', data.activeID);
    }
    return data;
  }

  async reg(login: string, pass: string): Promise<RegResponseInterface> {
    const url = `${environment.apiUrl}/router?action=register`;
    const source$ = this.http.post<RegResponseInterface>(
      url,
      { login, pass },
      this.httpOptions
    );
    const data = await lastValueFrom(source$);

    if (data.ok && !data.alreadyExist) {
      await this.login(login, pass);
    }

    return data;
  }
}
