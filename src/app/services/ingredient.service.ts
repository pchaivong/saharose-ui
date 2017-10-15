import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class IngredientService {

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
    console.log("TODO");

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

}

// For mockup
let mockData: IngredientData[] = [
  {id: 1, name: 'Porkshop', catName: 'Food'},
  {id: 2, name: 'Veggie', catName: 'Food'},
]

let mockNextId: number = 3;

export interface IngredientData{
  id: number,
  name: String,
  catName: String
}
