import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  public isAuthenticated: boolean;

  constructor() { 
    this.isAuthenticated = false;
  }

  login(username: string, password: string): boolean {
    if (username=='admin' && password=='admin'){
      this.isAuthenticated = true;
    }
    return this.isAuthenticated;
  }

  logout(){
    this.isAuthenticated = false;
  }

}
