import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';

import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { IngredientService, IngredientData } from '../services/ingredient.service';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {

  displayedColumns = ['name', 'catName', 'actions'];
  private dataSource;
  selectedValue: string;
  categories = [
    {id: 1, name: 'Food'},
    {id: 2, name: 'Drink'},
  ];

  constructor(private ingredientService: IngredientService, public dialog: MdDialog) { 
    this.dataSource = new IngredientDataSource(ingredientService);
  }

  ngOnInit() {
  }

  add(name, price){
    console.log("add: " + name + " price: " + price);
  }

}


export class IngredientDataSource extends DataSource<any>{
  constructor(private ingredientService: IngredientService){
    super();
  }

  connect(): Observable<IngredientData[]>{
    return this.ingredientService.listIngredients();
  }

  disconnect(){}
}
