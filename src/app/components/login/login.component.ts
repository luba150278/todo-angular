import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/services/auth.service';
import instance from 'src/shared/request';

interface LoginResInterface {
  token: string;
  activeID: string;
  ok: boolean;
  error?: string;
}
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

  async loginFunc() {
    
    if (this.login === '' || this.pass === '') {
      this.error = 'Пусте значення';
      return;
    }
const data = await this.service.login(this.login,this.pass);
if(data.error){
this.error=data.error;
return;
}    

  }
}
