import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';

import 'rxjs/add/observable/of';

@Injectable()
export class IngredientService {

  dataSource = new IngredientDataSource(this);

  constructor() { }

  listIngredients(): Observable<IngredientData[]>{
    return Observable.of(mockData);
  }

  add(ingredient: IngredientData){
    // Mock
    ingredient.id = mockNextId;
    mockNextId++;
    mockData.push(ingredient);
    console.log(ingredient.name + ' added');
  }

  remove(ingredient: IngredientData){
    let removedIdx = 0;
    mockData.forEach((v, i) => {
      if(v.id == ingredient.id){
        mockData.splice(i, 1);
      }
    });
  }

  update(ingredient: IngredientData){
    let id = ingredient.id;
    console.log("TODO");
  }

  refresh(): IngredientDataSource{
    return new IngredientDataSource(this);
  }

}

// For mockup
let mockData: IngredientData[] = [
  {id: 1, name: 'หมูสับ', price: 5, categoryId: 1},
  {id: 2, name: 'ผักลวก', price: 5, categoryId: 1},
]

let mockNextId: number = 3;

export interface IngredientData{
  id: number,
  name: String,
  price: number,
  categoryId: number
}

export class IngredientDataSource extends DataSource<any>{
  constructor(private ingredientService: IngredientService){
    super();
  }

  connect(): Observable<IngredientData[]>{
    return this.ingredientService.listIngredients();
  }

  refresh(): Observable<IngredientData[]>{
    return this.ingredientService.listIngredients();
  }

  disconnect(){}
}
