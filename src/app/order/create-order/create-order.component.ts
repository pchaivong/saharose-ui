import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MenuService, MenuData } from '../../services/menu.service';
import { CategoryData, CategoryService } from '../../services/category.service';
import { OrderService, OrderData, OrderDetailData } from '../../services/order.service';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA, MdButton} from '@angular/material';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  zones: string[] = ['A', 'B', 'C', 'D', 'E'];
  tableLabels: string[] = ['1','2','3','4','5','6','7','8','9', '10'];
  displayedColumns = ['name', 'amount'];

  selectedZone: string = '';
  selectedTableLabel: string = '';
  public dataSource;

  categories: CategoryData[];

  order: OrderData;

  constructor(private menuService: MenuService,
              private categoryService: CategoryService,
              public dialog: MdDialog){
    categoryService.listCategories().subscribe(data => this.categories = data);
    this.order = {id: 0, details: []};
  }

  ngOnInit() {
  }

  getSelectedTable(): string {
    if (this.selectedTableLabel == '' || this.selectedZone == ''){
      return '';
    } else {
      return this.selectedZone + this.selectedTableLabel;
    }
  }

  // Add order detail action
  // TODO: fix parameter typesafe
  openAddOrderDetailDialog(menu: any): void{
    let dialogRef = this.dialog.open(DialogAddOrderDetail, {
      width: '50%',
      data: menu
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Order detail added");
      this.order.details.push(result);
      console.log(this.order);
    })
  }

}

@Component({
  selector: 'dialog-add-order-detail',
  templateUrl: './dialog-add-order-detail.html',
  styleUrls: ['./dialog-add-order-detail.css'],
})
export class DialogAddOrderDetail{

  public amount: number = 1;
  @ViewChild('decBtn')decBtn: MdButton;

  public orderDetail: OrderDetailData;
  public menuConfiguration: MenuData;

  constructor(
    public dialogRef: MdDialogRef<DialogAddOrderDetail>,
    @Inject(MD_DIALOG_DATA) public data:any
  ){
    this.menuConfiguration = Object.assign({}, data);
    this.orderDetail = {id: 0, menu: Object.assign({}, data)};
    this.orderDetail.menu.addOn = [];
    this.orderDetail.menu.ingredients = Object.assign([], this.menuConfiguration.ingredients);
    console.log(this.orderDetail);
  }

  placeOrder(): void {
    this.dialogRef.close(this.orderDetail);
  }

  cancelOrder(): void {
    this.dialogRef.close();
  }


  // Amounts
  incAmount(){
    this.amount++;
    this.checkAmount();
  }
  decAmount(){
      this.amount--;
      this.checkAmount();
  }
  checkAmount(){
    if (this.amount == 0){
      this.decBtn.disabled = true;
    } else {
      this.decBtn.disabled = false;
    }
  }

  // Add-on and ingredients selection
  ingredientSelection(e, ing) {
    if (e.checked){
      this.orderDetail.menu.ingredients.push(ing);
    }
    else {  // Remove from ingredients
      this.orderDetail.menu.ingredients.forEach((v, i) =>{
        if (v.id == ing.id){
          this.orderDetail.menu.ingredients.splice(i, 1);
        }
      })
    }
  }
  toppingSelection(e, topping){
    if (e.checked){
      this.orderDetail.menu.addOn.push(topping);
    }
    else {
      this.orderDetail.menu.addOn.forEach((v,i) => {
        if (v.id == topping.id){
          this.orderDetail.menu.addOn.splice(i, 1);
        }
      })
    }
  }

}
