import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResInterface } from 'src/interfaces/auth.interface';
import instance from 'src/shared/request';
interface XXX {
  activeID: string;
  error?: string;
}
@Injectable({
  providedIn: 'root',
})
export class LoginService {
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

}
