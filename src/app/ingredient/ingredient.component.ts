import { Component, OnInit, OnChanges, Inject, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MdSnackBar } from '@angular/material';
import { IngredientService, IngredientData, IngredientDataSource, IngredientItem } from '../services/ingredient.service';
import { CategoryService, CategoryItem } from '../services/category.service';
import { CategoryIngredientItem } from '../configuration/configuration.component';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit, OnChanges {

  @Input('categories')
  public categories: CategoryItem[];

  @Input('ingredients')
  public ingredients: CategoryIngredientItem[];

  @Output()
  onDelete: EventEmitter<IngredientItem> = new EventEmitter<IngredientItem>();

  @Output()
  onUpdate: EventEmitter<IngredientItem> = new EventEmitter<IngredientItem>();
  
  @Output()
  onCreate: EventEmitter<any> = new EventEmitter<any>();





  selectedValue: string;

  constructor(private ingredientService: IngredientService,
              public snackBar: MdSnackBar, 
              public dialog: MdDialog) { }

  ngOnInit() {
  }

  ngOnChanges(){

  }

  add(name, price, categoryId){
    let ingredient: IngredientData = {id: 0, name: name, price: price, categoryId: categoryId};
    this.ingredientService.add(ingredient);
    console.log(ingredient);
  }

  getCategoryNameById(id: number){
    console.log(this.categories);
    return "test";
  }


  // Event handler
  openAddIngredientDialog(){
    let dialogRef = this.dialog.open(DialogAddIngredient, {
      width: '50%',
      data: this.categories
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.onCreate.emit({item: result.ingredient, category: result.categoryId});
      }
    });
  }

  openEditIngredientDialog(item: IngredientItem){
    console.log(item);
    let data = { categories: this.categories, ing: item };
    let dialogRef = this.dialog.open(DialogEditIngredient, {
      width: '50%',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.onUpdate.emit(result);
      }
    });
  }



  removeIngredient(ingredient: IngredientItem){
    this.onDelete.emit(ingredient)
  }

}

@Component({
  selector: 'dialog-add-ingredient',
  templateUrl: './dialog-add-ingredient.html'
})
export class DialogAddIngredient {
  public categoryId: number;
  public ingredient: IngredientItem = new IngredientItem(0, '', 0.0, 0.0);

  constructor(
    public dialogRef: MdDialogRef<DialogAddIngredient>,
    @Inject(MD_DIALOG_DATA) public data: any
  ){

  }

  addIngredient(){
    let item = { ingredient: this.ingredient, categoryId: this.categoryId };
    this.dialogRef.close(item);
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
  ingredient: IngredientItem
  categories: CategoryItem[]
  public tmpCatId: number;

  constructor(
    public dialogRef: MdDialogRef<DialogEditIngredient>,
    private ingredientService: IngredientService,
    @Inject(MD_DIALOG_DATA)public data: any
  ){
    this.ingredient = {
      id: data.ing.id,
      name: data.ing.name,
      price: data.ing.price,
      costPerUnit: data.ing.costPerUnit
    };
    this.categories = data.categories;
  }

  updateIngredient(){    
    this.dialogRef.close(this.ingredient);
  }

  cancel(){
    this.dialogRef.close(false);
  }
}


/*
export class IngredientDS extends DataSource<any>{
  constructor(public ingredients: CategoryIngredientItem[],
              public category: CategoryItem
            ){
    super();
  }

  connect(): Observable<IngredientItem[]>{
    let a = this.ingredients.map(v => v.ingredients);
    console.log(a);
    return Observable.of(a.reduce((a,b) => a.concat(b), []));
  }

  disconnect(){}
}
*/

/*
export class IngredientDS extends DataSource<any>{
  constructor(private ingredientService: IngredientService,
              public category: CategoryItem
            ){
    super();
  }

  connect(): Observable<IngredientItem[]>{
    return this.ingredientService.getIngredientList(this.category.id);
  }

  disconnect(){}

  refresh(){
  }

}
*/




