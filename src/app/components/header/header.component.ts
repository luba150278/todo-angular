import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() checkLogout = localStorage.getItem('token') ? false : true;
  @Output() checkLogoutChange = new EventEmitter<boolean>();
  @Output() themeChange = new EventEmitter<string>();
  @Input() theme = localStorage.getItem('theme') || 'Темна';
  error = '';
  @Input() isAuth = false;

  constructor(private service: AuthService) {}
  ngOnInit() {
    this.checkLogout = localStorage.getItem('token') ? false : true;
  }

  async logoutFunc(): Promise<void> {
    const data = await this.service.logout();
    if (data.ok) {
      this.checkLogout = true;
      this.checkLogoutChange.emit(this.checkLogout);
      localStorage.removeItem('token');
      localStorage.removeItem('activeID');
      return;
    }
    this.error = data.error || 'Помилка невідома';
  }

  changeTheme(): void {
    if (this.theme === 'Темна') {
      this.theme = 'Світла';
    } else {
      this.theme = 'Темна';
    }

    localStorage.setItem('theme', this.theme);
    this.themeChange.emit(this.theme);
  }
}
