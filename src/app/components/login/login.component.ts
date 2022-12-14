import { Component, Input } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import instance from 'src/shared/request';

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
  constructor(private service: AuthService) {}

  async loginFunc(): Promise<void> {
    if (this.login === '' || this.pass === '') {
      this.error = 'Пусте значення';
      return;
    }

    const data = await this.service.login(this.login, this.pass);

    if (data.ok) {
      this.activeID = data.activeID;
      return;
    }

    this.error = data.error || 'Помилка';
  }
}
