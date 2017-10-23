import { Component, OnInit, Inject } from '@angular/core';
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


  // Event handler
  openAddIngredientDialog(){
    let dialogRef = this.dialog.open(DialogAddIngredient, {
      width: '50%',
      data: this.categories
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.dataSource = this.ingredientService.refresh();
      }
    });
  }

  openEditIngredientDialog(ingredient: IngredientData){
    let dialogRef = this.dialog.open(DialogEditIngredient, {
      width: '50%',
      data: { ing: ingredient, categories: this.categories}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.dataSource = this.ingredientService.refresh();
      }
    });
  }

  removeIngredient(ingredient: IngredientData){
    this.ingredientService.remove(ingredient);
    this.dataSource = this.ingredientService.refresh();
  }

}

@Component({
  selector: 'dialog-add-ingredient',
  templateUrl: './dialog-add-ingredient.html'
})
export class DialogAddIngredient {
  ingredient: IngredientData;

  constructor(
    public dialogRef: MdDialogRef<DialogAddIngredient>,
    private ingredientService: IngredientService,
    @Inject(MD_DIALOG_DATA) public data: any
  ){
    this.ingredient = { id: 0, name:'', price: 0, categoryId: 0}
  }

  addIngredient(){
    this.ingredientService.add(this.ingredient);
    this.dialogRef.close(true);
  }

  cancel(){
    this.dialogRef.close(false);
  }
}

@Component({
  selector: 'dialog-edit-ingredient',
  templateUrl: './dialog-edit-ingredient.html'
})
export class DialogEditIngredient {
  ingredient: IngredientData
  categories: CategoryData[]

  constructor(
    public dialogRef: MdDialogRef<DialogEditIngredient>,
    private ingredientService: IngredientService,
    @Inject(MD_DIALOG_DATA)public data: any
  ){
    this.ingredient = {
      id: data.ing.id,
      name: data.ing.name,
      price: data.ing.price,
      categoryId: data.ing.categoryId
    };
    this.categories = data.categories;
  }

  updateIngredient(){
    this.ingredientService.update(this.ingredient);
    this.dialogRef.close(true);
  }

  cancel(){
    this.dialogRef.close(false);
  }
}



