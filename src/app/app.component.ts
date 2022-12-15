import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { AuthComponent } from './components/auth/auth.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  //15.12.2022 трохи переробила код - оптимізувала перевірку авторизації, убрала viewChild
  isLogout: boolean = false;
  isAuth = !!localStorage.getItem('token');
  ngAfterContentChecked() {
    if (localStorage.getItem('activeID')) {
      this.isAuth = true;
      this.isLogout = false;
      return;
    }
    if (this.isLogout) {
      this.isAuth = false;
    }
  }
}
