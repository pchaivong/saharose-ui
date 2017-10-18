import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MenuService } from '../../services/menu.service';
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

  categories = [
    {id: 1, name: 'Food'},
    {id: 2, name: 'Drink'}
  ];

  constructor(private menuService: MenuService,
              public dialog: MdDialog) { }

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
      data: menu
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }

}

@Component({
  selector: 'dialog-add-order-detail',
  templateUrl: './dialog-add-order-detail.html',
  styleUrls: ['./dialog-add-order-detail.css'],
})
export class DialogAddOrderDetail{

  toppings = [
    'ถั่วต้ม',
    'หัวใจ',
    'ตับ',
    'ไต',
    'ใส้',
    'พุง',
  ];

  public amount: number = 1;
  @ViewChild('decBtn')decBtn: MdButton;

  constructor(
    public dialogRef: MdDialogRef<DialogAddOrderDetail>,
    @Inject(MD_DIALOG_DATA) public data:any
  ){}

  placeOrder(): void {
    this.dialogRef.close();
  }

  cancelOrder(): void {
    this.dialogRef.close();
  }

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

}
