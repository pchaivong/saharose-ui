import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { CategoryService, CategoryData } from '../services/category.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  displayedColumns = ['name', 'numItems', 'actions'];
  public dataSource;

  constructor(private categoryService: CategoryService, public dialog: MdDialog) {
    this.dataSource = new CategoryDataSource(categoryService);
  }

  ngOnInit() {
  }

  openDialog(item): void {
    let dialogRef = this.dialog.open(DialogEditCategory, {
      width: '250px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  openAddCategoryDialog() {
    let dialogRef = this.dialog.open(DialogAddCategory,{
      width: '50%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log(result);
        this.categoryService.addCategory(result);
        this.reload();
      }
    });
  }

  reload(){
    this.dataSource = new CategoryDataSource(this.categoryService);
  }

  remove(element){
    console.log("remove element" + element);
    this.categoryService.remove(element);
    this.reload();
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
    this.category = {id: 0, name: '', numItems: 0, kittenEnabled: false};
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

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateCategory(){
    this.categoryService.update(this.data);
    this.dialogRef.close();
  }
}

export class CategoryDataSource extends DataSource<any>{
  constructor(private categoryService: CategoryService){
    super();
  }
  connect(): Observable<CategoryData[]>{
    return this.categoryService.listCategories();
  }
  disconnect(){}
}
