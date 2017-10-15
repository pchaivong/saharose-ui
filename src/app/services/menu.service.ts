import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import 'rxjs/add/observable/of';

@Injectable()
export class MenuService {

  dataSource = new MenuDataSource(this);

  constructor() { }

  add(menu: MenuData){
    this.addMock(menu);
  }

  list(): Observable<MenuData[]>{
    return this.listMock();
  }

  remove(menu: MenuData){
    this.removeMock(menu);
  }

  addMock(menu: MenuData){
    menu.id = mockNextId;
    mockNextId++;
    mockData.push(menu);
  }

  removeMock(menu: MenuData){
    mockData.forEach((v, i) => {
      if (v.id == menu.id){
        mockData.splice(i, 1);
      }
    });
  }

  listMock(): Observable<MenuData[]>{
    return Observable.of(mockData);
  }

}

export class MenuDataSource extends DataSource<any>{
  constructor(private menuService: MenuService){
    super();
  }

  connect(): Observable<MenuData[]>{
    return this.menuService.list();
  }

  disconnect(){}
}

// Data structure
export interface MenuData{
  id: number,
  name: string,
  categoryId: number,
  price: number
}

// Mockup stuff
let mockData: MenuData[] = [
  {id: 1, name: 'Noodle', categoryId: 1, price: 35},
  {id: 2, name: 'Noodless', categoryId: 1, price: 35},
  {id: 3, name: 'Water', categoryId: 2, price: 2},
];
let mockNextId: number = 1;
