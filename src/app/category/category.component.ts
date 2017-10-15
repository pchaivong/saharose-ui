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
  private dataSource;

  constructor(private categoryService: CategoryService, public dialog: MdDialog) {
    this.dataSource = new CategoryDataSource(categoryService);
  }

  ngOnInit() {
  }

  testAdd(catName){
    console.log("test add new items");
    let data = { id: 0, name: catName, numItems: 0};
    this.categoryService.addCategory(data);
    this.reload();
  }

  openDialog(item): void {
    let dialogRef = this.dialog.open(DialogEditCategory, {
      width: '250px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog is closed");
      console.log(result);
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

}

@Component({
  selector: 'dialog-edit-category-dialog',
  templateUrl: './dialog-edit-category-dialog.html',
})
export class DialogEditCategory{

  newCateName: string;

  constructor(
    public dialogRef: MdDialogRef<DialogEditCategory>,
    @Inject(MD_DIALOG_DATA) public data: any){ 

     this.newCateName = this.data.name;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmNewName(){
    this.dialogRef.close(this.data);
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
