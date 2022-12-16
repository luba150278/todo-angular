import { Component, Input } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  login: string = '';
  pass: string = '';
  error: string = '';
  @Input() activeID = '';
  constructor(private service: AuthService) {}

  async loginFunc() {
    if (this.login === '' || this.pass === '') {
      this.error = 'Пусте значення';
      return;
    }
    const data = await this.service.login(this.login, this.pass);
    if (data.error) {
      this.error = data.error;
      return;
    }
  }
}
