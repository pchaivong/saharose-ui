import { Component, OnInit, OnChanges } from '@angular/core';
import { CategoryService, CategoryItem } from '../services/category.service';
import { IngredientService, IngredientItem } from '../services/ingredient.service';
import { MenuService, MenuItem } from '../services/menu.service';
import { MdSnackBar } from '@angular/material';


@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit, OnChanges {

  public categories: CategoryItem[];
  public ingredients: CategoryIngredientItem[];
  public menus: CategoryMenuItem[];

  constructor(
    public snackBar: MdSnackBar,
    private categoryService: CategoryService,
    private ingredientService: IngredientService,
    private menuService: MenuService) { 

      this.initialData();
  }

  ngOnInit() {

  }

  ngOnChanges(){
    if (this.categories != null){
//      this.initIngredients();
    }
  }

  /**
   * Event handler for create category
   */
  createCategory(item: CategoryItem){
    this.categoryService.addCategory(item)
    .subscribe((res) => {
      if (res.status == 201){
        this.reloadCategories();
        this.snackBar.open("Category \"" + item.name + "\" created.",
              "OK", {duration: 2000});
      }
    });
  }

  /**
   * EventHander for delete given category
   */
  deleteCategory(item: CategoryItem){
    this.categoryService.remove(item)
    .subscribe(res => {
      if (res.status == 204){
        this.reloadCategories();
        this.snackBar.open("Category \"" + item.name + "\" removed.",
            "OK", {duration: 2000});
      }
    });
  }

  /**
   * EventHandler for update category
   */
  updateCategory(item: CategoryItem){
    this.categoryService.update(item)
    .subscribe(res => {
      if (res.status == 200){
        this.reloadCategories();
        this.snackBar.open("Category \"" + item.name + "\" updated.",
            "OK", {duration: 2000});
      }
    });
  }

  createIngredient(e: any){
    let item: IngredientItem = e.item;
    let categoryId: number = e.category;
    this.ingredientService.addIngredient(item, categoryId)
    .subscribe(res => {
      if (res.status == 201){
        this.initIngredients();
        this.reloadCategories();
        this.snackBar.open("Ingredient \"" + item.name + "\" created.",
          "OK", {duration: 2000});
      }
    });
  }

  /**
   * Ingredient: Remove ingredient handler
   */
  removeIngredient(item: IngredientItem){
    this.ingredientService.removeIngredient(item)
    .subscribe(res => {
      if (res.status == 204){
        this.initIngredients();
        this.reloadCategories();
        this.snackBar.open("Ingredient \"" + item.name + "\" removed.",
            "OK", {duration: 2000});
      }
    });
  }

  /**
   * Ingredient: Update ingredient
   */
  updateIngredient(item: IngredientItem){
    this.ingredientService.updateIngredient(item)
    .subscribe(res => {
      if (res.status == 200){
        this.initIngredients();
        this.snackBar.open("Ingredient \"" + item.name + "\" updated.",
            "OK", {duration: 2000});
      }
    });
  }

  /**
   * Menu: Create new menu
   */
  createMenu(e: any){
    let item: MenuItem = e.item;
    let categoryId: number = e.categoryId;

    this.menuService.addMenu(item, categoryId)
    .subscribe(res => {
      if (res.status == 201){
        this.initMenus();
        this.reloadCategories();
        this.snackBar.open("Menu \"" + item.name + "\" is created",
        "OK", {duration: 2000});
      }
    });
  }

  /**
   * Menu: Remove menu
   */
  removeMenu(item: MenuItem){
    this.menuService.removeMenu(item)
    .subscribe(res => {
      if (res.status == 204){
        this.initMenus();
        this.reloadCategories();
        this.snackBar.open("Menu \"" + item.name + "\" is removed",
        "OK", {duration: 2000});
      }
    });
  }


  /**
   * Only reload category list regardless changes
   * any underlying data models (ingredients, menus)
   * 
   * If the changes were done to other sub data model
   * DO NOT use this reload.
   * 
   * This method is for high level reloading only.
   */
  private reloadCategories(){
    this.categoryService.getCategoryList()
    .subscribe((data: CategoryItem[]) => {
      this.categories = data;
    });
  }


  private initialData(){
    this.categoryService.getCategoryList()
    .subscribe((data: CategoryItem[]) => {
      this.categories = data;
      this.initIngredients();
      this.initMenus();
    });
  }


  /**
   * Search and update ingredient for specific category
   */
  private reloadIngredients(category: CategoryItem){
    this.ingredients.forEach((v, i) => {
      if (v.category.id == category.id){
        this.ingredientService.getIngredientList(category.id)
        .subscribe((data: IngredientItem[]) => {
          v.ingredients = data;
          console.log(data);
        });
      }
    });
  }


  private initIngredients(){
    this.ingredients = [];
    this.categories.forEach(v => {
      this.ingredientService.getIngredientList(v.id)
      .subscribe((data: IngredientItem[]) => {
        this.ingredients.push({category: v, ingredients: data});
      });
    });
  }

  private initMenus(){
    this.menus = [];
    this.categories.forEach(v => {
      this.menuService.getMenuList(v.id)
      .subscribe((data: MenuItem[]) => {
        this.menus.push({category: v, menus: data});
      })
    })
  }


}

/**
 * Data structure interface for ingredients which belong to 
 * each category. This data is mainly used in "Ingredient" configuration
 */
export interface CategoryIngredientItem {
  category: CategoryItem,
  ingredients: IngredientItem[]
}

export interface CategoryMenuItem {
  category: CategoryItem,
  menus: MenuItem[]
}
