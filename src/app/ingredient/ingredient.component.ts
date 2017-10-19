import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { IngredientService, IngredientData, IngredientDataSource } from '../services/ingredient.service';
import { CategoryService, CategoryData } from '../services/category.service';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {

  displayedColumns = ['name', 'catName', 'price', 'actions'];
  public dataSource: IngredientDataSource;
  selectedValue: string;
  categories: CategoryData[];

  constructor(private ingredientService: IngredientService, 
              private categoryService: CategoryService,
              public dialog: MdDialog) { 
    this.dataSource = ingredientService.dataSource;
    categoryService.listCategories().subscribe(data => {
      this.categories = data;
    });
  }

  ngOnInit() {
  }

  add(name, price, categoryId){
    let ingredient: IngredientData = {id: 0, name: name, price: price, categoryId: categoryId};
    this.ingredientService.add(ingredient);
    console.log(ingredient);
    this.dataSource = this.ingredientService.refresh();
  }

  getCategoryNameById(id: number){
    return this.categories.filter(v => {
      return v.id==id;
    }).map(v => v.name);
  }

}



