import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.css']
})
export class UserAvatarComponent implements OnInit {

  @Output()
  onLogout: EventEmitter<any> = new EventEmitter<any>();

  @Input('username')
  username: string;

  constructor() { }

  ngOnInit() {
  }

  logout(){
    this.onLogout.emit();
  }

}
