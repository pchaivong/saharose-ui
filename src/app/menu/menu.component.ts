import { Component, OnInit, Inject } from '@angular/core';
import { MenuService, MenuData, SizeData } from '../services/menu.service';
import { IngredientService, IngredientData } from '../services/ingredient.service';
import { CategoryService, CategoryData } from '../services/category.service';
import { MdDialogRef, MdDialog, MD_DIALOG_DATA , MdSlideToggleChange } from '@angular/material';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  displayedColumns = ['name', 'category', 'price', 'actions'];
  public dataSource;
  categories: CategoryData[];

  constructor(private menuService: MenuService,
              private ingredientService: IngredientService,
              private categoryService: CategoryService,
              public dialog: MdDialog) { 
    this.dataSource = menuService.dataSource;
    categoryService.listCategories().subscribe(data => { this.categories = data; });
  }

  ngOnInit() {
  }

  addMenu(menu: MenuData){
    this.menuService.add(menu);
  }

  removeMenu(menu: MenuData){
    this.menuService.remove(menu);
    this.dataSource = this.menuService.refresh();
  }

  getCategoryName(id: number){
    return this.categories.filter(v => {
      return v.id == id;
    })
    .map(v => v.name);
  }

  openAddMenuDialog(){
    let dialogRef = this.dialog.open(DialogAddMenu, {
      width: '50%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.dataSource = this.menuService.refresh();
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
  categories: CategoryData[];
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

    categoryService.listCategories().subscribe(data => {
      this.categories = data;
    });
  }

  cancelAddMenu() {
    this.dialogRef.close();
  }

  addMenu(){
    let data = {
      id: 0, 
      name: this.menuName,
      size: this.sizes,
      categoryId: this.menuCat,
      ingredients: this.menuIngredients,
      addOn: this.menuAddOns
    };

    this.menuService.add(data);
    this.dialogRef.close();
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
