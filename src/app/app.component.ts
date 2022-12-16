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
//Оптимізувала 15.12.22 код - прибрала viewChild
export class AppComponent {
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
