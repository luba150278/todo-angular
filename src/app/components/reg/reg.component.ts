import { AuthService } from 'src/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import instance from 'src/shared/request';

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
  constructor(private service: AuthService) {}

  async regFunc(): Promise<void> {
    if (this.login === '' || this.pass === '') {
      this.error = 'Пусте значення';
      return;
    }
    const data = await this.service.reg(this.login, this.pass);
    if (data.ok && data.alreadyExist) {
      this.error = 'Вже існує';
    }
    if (!data.ok) {
      this.error = 'Помилка реєстрації';
    }
  }
}
