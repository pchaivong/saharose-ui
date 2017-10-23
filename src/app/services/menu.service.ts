import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import { IngredientData } from './ingredient.service';

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

  getMenuByCategory(categoryId: number){
    return mockData.filter((v) => {
      if(v.categoryId==categoryId){
        return true;
      }
    });
  }

  refresh(): MenuDataSource {
    this.dataSource =  new MenuDataSource(this);
    return this.dataSource;
  }

  removeMock(menu: MenuData){
    console.log("Remove menu");
    console.log(menu);
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
  size: SizeData[],
  ingredients: IngredientData[],
  addOn: IngredientData[]
}
export interface SizeData {
  name: string,
  price: number
}

// Mockup stuff
let mockData: MenuData[] = [
  {id: 1, name: 'ก๋วยจั๊บ', categoryId: 1, size:[{name: "ธรรมดา", price: 30}, {name: "พิเศษ", price: 40}] , ingredients: [], addOn: []},
  {id: 2, name: 'ก๋วยเตี๋ยว', categoryId: 1, size:[{name: "ธรรมดา", price: 30}, {name: "พิเศษ", price: 40}], ingredients: [], addOn: []},
  {id: 3, name: 'เกาเหลา', categoryId: 1, size:[{name: "ธรรมดา", price: 30}, {name: "พิเศษ", price: 40}], ingredients: [], addOn: []},
  {id: 4, name: 'น้ำเปล่า', categoryId: 2, size:[{name: "ธรรมดา", price: 2}], ingredients: [], addOn: []},
  {id: 5, name: 'เป๊ปซี่', categoryId: 2, size:[{name: "ขวดเล็ก", price: 25}, {name: "ขวดใหญ่", price: 35}], ingredients: [], addOn: []},
  /*
  {id: 6, name: 'ข้าว', categoryId: 1, price: 5, ingredients: [], addOn: []},
  {id: 7, name: 'โจ๊ก', categoryId: 1, price: 25, ingredients: [], addOn: []},
  {id: 8, name: 'ผักลวก', categoryId: 1, price: 5, ingredients: [], addOn: []}, */
];
let mockNextId: number = 1;
