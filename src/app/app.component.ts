import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'diary-project';
  constructor(public appService: AppService, private router: Router) {}
  logout() {
    this.appService.authenticated = false;
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
