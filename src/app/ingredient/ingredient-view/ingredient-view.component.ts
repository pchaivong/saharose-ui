import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { CategoryItem } from '../../services/category.service';
import { IngredientItem } from '../../services/ingredient.service';

import { CategoryIngredientItem } from '../../configuration/configuration.component';

@Component({
  selector: 'app-ingredient-view',
  templateUrl: './ingredient-view.component.html',
  styleUrls: ['./ingredient-view.component.css']
})
export class IngredientViewComponent implements OnInit, OnChanges {

//  @Input('datasource')
  public datasource: IngredientDataSource;

  @Input('ingredients')
  ingredients: CategoryIngredientItem;

  @Output()
  onSelected: EventEmitter<IngredientItem> = new EventEmitter<IngredientItem>();

  @Output()
  onDelete: EventEmitter<IngredientItem> = new EventEmitter<IngredientItem>();

  ings: IngredientItem[] = [];

  displayedColumns = ["name", "price", "actions"];

  constructor(){
  }

  ngOnInit() {
  }

  ngOnChanges(){
    console.debug("update datasource");
    if (this.ingredients != null){
      this.datasource = new IngredientDataSource(this.ingredients.ingredients);
    }
  }

  selected(item: IngredientItem){
    this.onSelected.emit(item);
  }

  remove(item: IngredientItem){
    this.onDelete.emit(item);
  }

}

export class IngredientDataSource extends DataSource<any>{
  constructor(public ingredients: IngredientItem[]
            ){
    super();
  }

  connect(): Observable<IngredientItem[]>{
    return Observable.of(this.ingredients);
  }

  disconnect(){}
}




