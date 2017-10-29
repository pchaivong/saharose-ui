import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';



@Injectable()
export class CategoryService {

  private apiUrl: string = environment.apiEndpoint + '/categories';
  constructor(private http: Http) { }

  getCategoryList(): Observable<CategoryItem[]>{
    return this.http.get(this.apiUrl)
              .map((res: Response) => {
                return res.json().map(item => {
                  return new CategoryItem(
                    item.id,
                    item.name,
                    item["menu-items"],
                    item["ingredient-items"],
                    item["kitchen-enabled"]
                  );
                });
              });
  }

  addCategory(cat: CategoryItem): Observable<Response> {
    console.debug("Add Category");
    console.debug(cat);
    return this.http.post(this.apiUrl, cat)
  }

  update(cat: CategoryItem): Observable<Response> {
    return this.http.put(this.apiUrl+'/'+cat.id, cat)
  }

  remove(category: CategoryItem): Observable<Response>{
    console.debug("Delete category");
    console.debug("CategoryId: " + category.id);
    let removedId = category.id;
    return this.http.delete(this.apiUrl + '/' + removedId)
  }
}

// TODO: Removed
export interface CategoryData {
  id: number,
  name: string,
  menuItems : number,
  ingredientItems: number,
  kittenEnabled: boolean
}

export class CategoryItem {
  constructor(
    public id: number,
    public name: string,
    public menuItems: number,
    public ingredientItems: number,
    public kitchen_enabled: boolean
  ) {}
}
