import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: string;
  public password: string

  @Output()
  onLogin: EventEmitter<loginData> = new EventEmitter<loginData>();

  constructor() { }

  ngOnInit() {
  }

  login(){
    console.log("Emit event")
    this.onLogin.emit({username: this.username, password: this.password});
  }

  submittable(): boolean {
    if (this.username != null && this.password != null){
      return true;
    }
    return false;
  }

  clear(){
    this.username = null;
    this.password = null;
  }

}

interface loginData {
  username: string,
  password: string
}
