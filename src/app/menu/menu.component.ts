import { Component, OnInit } from '@angular/core';
import { MenuService, MenuData } from '../services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  displayedColumns = ['name', 'category', 'price', 'actions'];
  private dataSource;

  constructor(private menuService: MenuService) { 
    this.dataSource = menuService.dataSource;
  }

  ngOnInit() {
  }

  addMenu(menu: MenuData){
    this.menuService.add(menu);
  }

  removeMenu(menu: MenuData){
    this.menuService.remove(menu);
  }

}
