import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AuthComponent } from './components/auth/auth.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLogout: boolean = false;
  //@Output() logoutF = new EventEmitter<boolean>();
  isAuth = !!localStorage.getItem('token');
  @ViewChild(AuthComponent)
  viewChild!: AuthComponent;
  ngOnInit() {
    console.log('init');
  }

  ngAfterContentChecked() {
    console.log(this.isLogout);
    if (this.viewChild) {
      if (localStorage.getItem('activeID')) {
        this.isAuth = true;
      }
    }

    if (this.isLogout) {
      this.isAuth = false;
    }
  }
}
