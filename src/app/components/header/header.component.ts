import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import instance from 'src/shared/request';
interface LogoutResInterface {
  ok: boolean;
  error?: string;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() checkLogout = false;
  @Output() checkLogoutChange = new EventEmitter<boolean>();
  httpOptions = instance();
  error = '';
  constructor(private http: HttpClient) {}
  logoutFunc(): void {
    // const res = await instance.post("router?action=logout");
    // if (res.data.ok) {
    //   clearSrorage();
    //   toggleLogin(false)
    // } else {

    // }

    const url = `${environment.apiUrl}/router?action=logout`;
    const res = this.http
      .post<LogoutResInterface>(
        url,

        this.httpOptions
      )
      .pipe(map((data) => data))
      .subscribe({
        next: (data) => {
          if (data.ok) {
            this.checkLogout = true;
            this.checkLogoutChange.emit(this.checkLogout);
            localStorage.clear();

            return;
          }
          this.error = 'Помилка! спробуйте разлогінитеся ще раз';
        },
        error: (e) => {
          this.error = `Server error + ${e.message}`;
        },
      });
  }
}
