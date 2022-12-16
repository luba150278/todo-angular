import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/services/auth.service';
import instance from 'src/shared/request';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() checkLogout = false;
  @Output() checkLogoutChange = new EventEmitter<boolean>();
  @Output() themeChange = new EventEmitter<string>();
  httpOptions = instance();
  error = '';
  @Input() theme = localStorage.getItem('theme') || 'Темна';
  constructor(private service: AuthService) {}
  ngOnInit() {
    console.log(localStorage.getItem('token'));
    if (localStorage.getItem('token')) {
      this.checkLogout = false;
    } else {
      this.checkLogout = true;
    }
  }
  async logoutFunc(): Promise<void> {
    const data = await this.service.logout();
    if (data.ok) {
      this.checkLogout = true;
      this.checkLogoutChange.emit(this.checkLogout);
      localStorage.removeItem("token");
      localStorage.removeItem("activeID");
      return;
    }
    this.error = data.error || 'Помилка невідома';
  }

  changeTheme():void {
    if (this.theme === 'Темна') {
      this.theme = 'Світла'
    } else {
      this.theme = 'Темна'
    }

    localStorage.setItem('theme', this.theme)
    this.themeChange.emit(this.theme);

  }
}
