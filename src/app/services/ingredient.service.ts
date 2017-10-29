import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';

import { environment } from '../../environments/environment';

import 'rxjs/add/observable/of';

@Injectable()
export class IngredientService {

  dataSource = new IngredientDataSource(this);

  constructor(
              private http: Http
            ) { }

  listIngredients(): Observable<IngredientData[]>{
    return Observable.of(mockData);
  }

  /**
   * Get ingredient list by specific category
   */
  getIngredientList(categoryId: number): Observable<IngredientItem[]>{
    let endpoint = environment.apiEndpoint + '/categories/' + categoryId + '/ingredients';
    return this.http.get(endpoint)
      .map((res: Response) => {
        return res.json().map(item => {
          return new IngredientItem(
            item.id,
            item.name,
            item.price,
            item["cost-per-unit"]
          );
        });
      });
  }

  addIngredient(ingredient: IngredientItem, categoryId: number): Observable<Response>{
    let endpoint = environment.apiEndpoint + '/categories/' + categoryId + '/ingredients';
    return this.http.post(endpoint, ingredient);
  }

  removeIngredient(ingredient: IngredientItem): Observable<Response>{
    let endpoint = environment.apiEndpoint + '/ingredients/' + ingredient.id;
    return this.http.delete(endpoint);
  }

  updateIngredient(ingredient: IngredientItem): Observable<Response>{
    let endpoint = environment.apiEndpoint + '/ingredients/' + ingredient.id;
    return this.http.put(endpoint, ingredient);
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
    mockData.forEach((v, i) => {
      if (v.id == ingredient.id){
        mockData[i] = Object.assign({}, ingredient);
      }
    });  
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

export class IngredientItem {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public costPerUnit: number
  ) {}
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
