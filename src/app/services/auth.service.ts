import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  public isAuthenticated: boolean;
  public authdata: AuthData;

  constructor() { 
    this.isAuthenticated = false;
  }

  login(username: string, password: string): boolean {
    let auth: AuthData[] = mockAuthData.filter(v => {
      if (v.username == username && v.password == password){
        return true;
      }
      return false;
    });

    if (auth.length < 1){
      this.isAuthenticated = false;
    }
    else {
      this.authdata = auth[0];
      this.isAuthenticated = true;
    }

    /*
    if (username=='admin' && password=='admin'){
      this.isAuthenticated = true;
    }
    */
    return this.isAuthenticated;
  }

  logout(){
    this.isAuthenticated = false;
  }

}

interface AuthData {
  username: string,
  password: string,
  role : string
}

let mockAuthData: AuthData[] = [
  {username: 'admin', password: 'admin', role: 'admin'},
  {username: 'pui', password: 'pui', role: 'waitress'},
  {username: 'beau', password: 'beau', role: 'cook'}
];
