import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MdSidenav } from '@angular/material';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit{

  // Add more menu here.
  menus = [
    { path: '/order', label: 'Order', icon: 'local_dining'},
    { path: '/configuration', label: 'Configuration', icon: 'build'},
    { path: '/cooking', label: 'Cooking', icon: 'whatshot'},
    { path: '/report', label: 'Report', icon: 'trending_up'},
  ];

  @ViewChild('nav') nav: MdSidenav;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  selectRoute(path) {
    this.router.navigateByUrl(path);
  }

  public toggle() {
    this.nav.toggle();
  }

}
