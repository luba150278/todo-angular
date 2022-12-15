import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/services/auth.service';
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
  constructor(private service: AuthService) {}

  async regFunc(): Promise<void> {
    if (this.login === '' || this.pass === '') {
      this.error = 'Пусте значення';
      return;
    }
    const data = await this.service.reg(this.login, this.pass);
    if (data.error) {
      this.error = data.error;
      return;
    }
    this.activeID=localStorage.getItem("activeID")|| "";
  }
  
}
