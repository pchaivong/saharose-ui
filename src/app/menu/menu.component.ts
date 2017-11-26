import { Component, OnInit, OnChanges, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MenuService, MenuData, SizeData, MenuItem } from '../services/menu.service';
import { IngredientService, IngredientData } from '../services/ingredient.service';
import { CategoryService, CategoryData, CategoryItem } from '../services/category.service';
import { CategoryMenuItem } from '../configuration/configuration.component';

import { MdDialogRef, MdDialog, MD_DIALOG_DATA , MdSlideToggleChange } from '@angular/material';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnChanges {

  @Input('categories')
  public categories: CategoryItem[];

  @Input('menus')
  public menus: CategoryMenuItem[];

  @Output()
  onDelete: EventEmitter<MenuItem> = new EventEmitter<MenuItem>();

  @Output()
  onCreate: EventEmitter<any> = new EventEmitter<any>();

  constructor(private menuService: MenuService,
              public dialog: MdDialog){}

  ngOnInit(){}

  ngOnChanges(){}

  removeMenu(menu: MenuItem){
    this.onDelete.emit(menu);
  }


  // Open add menu dialog
  openAddMenuDialog(){
    let dialogRef = this.dialog.open(DialogAddMenu, {
      width: '50%',
      data: this.categories
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.onCreate.emit({item: result.menu, categoryId: result.categoryId});
      }
    })
  }

}

// Add Menu dialog
@Component({
  selector: 'dialog-add-menu',
  templateUrl: './dialog-add-menu.html',
  styleUrls: ['./dialog-add-menu.css']
})
export class DialogAddMenu {

  ingredients: IngredientData[];
  categories: CategoryItem[];
  sizes: SizeData[] = [];

  menuName: string;
  menuPrice: number;
  menuCat: number;
  menuAddOns: IngredientData[] = [];
  menuIngredients: IngredientData[] = [];

  sizeName: string;
  sizePrice: number;

  constructor(
    private ingredientService: IngredientService,
    private menuService: MenuService,
    private categoryService: CategoryService,
    public dialogRef: MdDialogRef<DialogAddMenu>,
    @Inject(MD_DIALOG_DATA) public data: any
  ){
    ingredientService.listIngredients().subscribe(data => {
      this.ingredients = data;
    });

    categoryService.getCategoryList().subscribe(data => {
      this.categories = data;
    });
  }

  cancelAddMenu() {
    this.dialogRef.close();
  }

  addMenu(){
    let item = {
      name: this.menuName,
      sizes: this.sizes,
      ingredients: []
    };

    let data = {menu: item, categoryId: this.menuCat};
    console.log(data);
    this.dialogRef.close(data);
  }

  // Event handlers
  addSize(){
    this.sizes.push({name: this.sizeName, price: this.sizePrice});
  }
  addOnToggle(event: MdSlideToggleChange, ing: IngredientData){
    if(event.checked){
      this.menuAddOns.push(ing);
    }
    else { // Remove from add-on list
      this.menuAddOns.forEach((v, i) => {
        if (v.id == ing.id){
          this.menuAddOns.splice(i, 1);
        }
      });
    }
    console.log(this.menuAddOns);
  }

  ingredientToggle(event: MdSlideToggleChange, ing: IngredientData){
    if (event.checked){
      this.menuIngredients.push(ing);
    }
    else {
      this.menuIngredients.forEach((v, i) => {
        if (v.id == ing.id){
          this.menuIngredients.splice(i, 1);
        }
      });
    }

    console.log(this.menuIngredients);
  }
}
