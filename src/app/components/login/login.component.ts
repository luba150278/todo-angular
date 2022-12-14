import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResInterface } from 'src/interfaces/auth.interface';
import instance from 'src/shared/request';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  httpOptions = instance();
  login: string = '';
  pass: string = '';
  error: string = '';
  @Input() activeID = '';
  constructor(private http: HttpClient, private service: LoginService) {}

  async loginFunc(): Promise<void> {
    if (this.login === '' || this.pass === '') {
      this.error = 'Пусте значення';
      return;
    }

    // this.service.login(this.login, this.pass).subscribe({
    //   next: (data) => {
    //     if (data.token !== '' && data.activeID !== '') {
    //       this.activeID = data.activeID;
    //       localStorage.setItem('token', data.token);
    //       localStorage.setItem('activeID', data.activeID);
    //       return;
    //     }
    //     this.error = 'Такий користувач не зареэстрований';
    //   },
    //   error: (e) => {
    //     this.error = `Server error + ${e.message}`;
    //   },
    // });

    const data = await this.service.login(this.login, this.pass);
    // if (!data.ok) {
    //   this.error = data.error || 'Невідома помилка';
    // }
    //console.log(data)
    if (data.ok) {
      // localStorage.setItem('token', data.token);
      // localStorage.setItem('activeID', data.activeID);
      this.activeID = data.activeID;
    }

    // this.activeID = this.service.getActiveID();
    // this.error = this.service.getError();
    //console.log('aid:' + this.activeID);
  }
}
