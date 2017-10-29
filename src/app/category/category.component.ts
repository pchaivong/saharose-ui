import { Component, OnInit, ElementRef, ViewChild, Inject, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { OnChanges } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MdSnackBar } from '@angular/material';

import { CategoryService, CategoryData, CategoryItem } from '../services/category.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnChanges {

  displayedColumns = ['name', 'menuItems', 'ingItems', 'actions'];
  public dataSource;

  @Input('categories')
  categories: CategoryItem[];

  @Output()
  onCreate: EventEmitter<CategoryItem> = new EventEmitter<CategoryItem>();

  @Output()
  onDelete: EventEmitter<CategoryItem> = new EventEmitter<CategoryItem>();

  @Output()
  onUpdate: EventEmitter<CategoryItem> = new EventEmitter<CategoryItem>();

  constructor(private categoryService: CategoryService,
              private ref: ChangeDetectorRef, 
              public snackBar: MdSnackBar,
              public dialog: MdDialog) {

    this.dataSource = new CategoryDataSource(this.categories);
  }

  ngOnInit() {
    console.log(this.categories);
  }

  ngOnChanges(){
    this.dataSource = new CategoryDataSource(this.categories);
    console.log(this.dataSource);
  }

  /**
   * Open Update Category dialog
   */
  openDialog(item): void {
    let dialogRef = this.dialog.open(DialogEditCategory, {
      width: '250px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.onUpdate.emit(result);
      }
    });
  }

  openAddCategoryDialog() {
    let dialogRef = this.dialog.open(DialogAddCategory,{
      width: '50%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.onCreate.emit(result);
      }
    });
  }

  reload(){
    this.dataSource = new CategoryDataSource(this.categories);
    this.ref.detectChanges();
  }

  remove(item: CategoryItem){
    this.onDelete.emit(item);
  }

  selectRow(row){
    console.log(row);
  }

}

/**
 * Add Category dialog
 */
@Component({
  selector: 'dialog-add-category',
  templateUrl: './dialog-add-category.html'
})
export class DialogAddCategory {

  category: CategoryData;

  constructor(
    public dialogRef: MdDialogRef<DialogAddCategory>
  ){
    this.category = {id: 0, name: '', menuItems: 0, ingredientItems: 0, kittenEnabled: false};
  }

  addCategory(){
    this.dialogRef.close(this.category);
  }
}


/**
 * Edit Category Dialog
 */
@Component({
  selector: 'dialog-edit-category-dialog',
  templateUrl: './dialog-edit-category-dialog.html',
})
export class DialogEditCategory{

  constructor(
    public dialogRef: MdDialogRef<DialogEditCategory>,
    private categoryService: CategoryService,
    @Inject(MD_DIALOG_DATA) public data: any){ 
    }

  updateCategory(){
   // this.categoryService.update(this.data);
    this.dialogRef.close(this.data);
  }
}


export class CategoryDataSource extends DataSource<any>{
  constructor(private data: CategoryItem[]){
    super();
  }
  connect(): Observable<CategoryItem[]>{
    return Observable.of(this.data);
  }
  disconnect(){}
}
