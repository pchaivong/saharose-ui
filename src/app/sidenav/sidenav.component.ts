import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MdSidenav } from '@angular/material';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit{

  @Input('auth')
  authData: any;

  // Add more menu here.
  menus: MenuData[] = [
    { path: '/order', label: 'Order', icon: 'local_dining', roles: ['admin', 'waitress']},
    { path: '/cooking', label: 'Cooking', icon: 'whatshot', roles: ['admin', 'cook', 'waitress']},
    { path: '/report', label: 'Report', icon: 'trending_up', roles: ['admin']},
    { path: '/configuration', label: 'Configuration', icon: 'build', roles: ['admin']},
  ];

  
  @ViewChild('nav') nav: MdSidenav;

  constructor(private router: Router) {
   }

  ngOnInit() {
  }

  selectRoute(path) {
    this.router.navigateByUrl(path);
  }

  public toggle() {
    this.nav.toggle();
  }

  getAvailableMenu(): MenuData[]{
    return this.menus.filter(v => {
      return (v.roles.includes(this.authData.role))
    });
  }
}

interface MenuData {
  path: string,
  label: string,
  icon: string,
  roles: string[]
}
