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
    // this.http
    //   .post<LoginResInterface>(url, { login, pass }, this.httpOptions)
    //   .pipe(map((data) => data))
    //   .subscribe({
    //     next: (data) => {
    //       if (data.token !== '' && data.activeID !== '') {
    //         //this.activeID = data.activeID;
    //         localStorage.setItem('token', data.token);
    //         localStorage.setItem('activeID', data.activeID);
    //         console.log('naid' + data.activeID);
    //         this.setActiveID(data.activeID);
    //         //this.activeID = data.activeID;
    //         return;
    //       }
    //       this.error = 'Такий користувач не зареэстрований';
    //     },
    //     error: (e) => {
    //       this.error = `Server error + ${e.message}`;
    //     },
    //   });

    // const t = await this.http
    //   .post<LoginResInterface>(url, { login, pass }, this.httpOptions)
    //   .toPromise();
    // console.log(t);

    const source$ = this.http.post<LoginResInterface>(
      url,
      { login, pass },
      this.httpOptions
    );
    const data = await lastValueFrom(source$);
    return data;
    //console.log(`The final number is ${JSON.stringify(finalNumber)}`);
  }

  setActiveID(data: string): void {
    this.activeID = data;
  }
  getActiveID() {
    return this.activeID;
  }

  getError() {
    return this.error;
  }
}
