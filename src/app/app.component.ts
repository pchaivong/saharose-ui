import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public isAuthenticated: boolean;
  public authData: any;

  constructor(private authService: AuthService){
    this.isAuthenticated = authService.isAuthenticated;
  }

  login(e){
    console.log("logging in ....");
    this.isAuthenticated = this.authService.login(e.username, e.password);
    this.authData = this.authService.authdata;
  }

  logout(){
    this.isAuthenticated = false;
    this.authService.logout();
  }
}
