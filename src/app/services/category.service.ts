import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';



@Injectable()
export class CategoryService {

  constructor() { }

  listCategories(): Observable<CategoryData[]> {
    // TODO: this is just mock
    return Observable.of(mockData);
  }

  addCategory(cat: CategoryData) {
    cat.id = mockNextId;
    mockNextId++;
    mockData.push(cat);
    console.log(cat.name + " added");
  }

  update(cat: CategoryData) {
    mockData.forEach((v, i) => {
      if (v.id == cat.id){
        mockData[i] = Object.assign({}, cat);
      }
    });
  }

  remove(category: CategoryData){
    // For mock
    console.log("Remove category id: " + category.id);
    mockData.forEach((v, i) => {
      if (v.id == category.id) {
        mockData.splice(i, 1);
      }
    });

    // TODO: REST call implementation HERE
  }
}

let mockData: CategoryData[] = [
  {id: 1, name: 'อาหาร', numItems: 3, kittenEnabled: true},
  {id: 2, name: 'เครื่องดื่ม', numItems: 4, kittenEnabled: false}
];

let mockNextId: number = 3;

export interface CategoryData {
  id: number,
  name: string,
  numItems : number,
  kittenEnabled: boolean
}
