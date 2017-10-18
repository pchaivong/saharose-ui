import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';

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

  constructor(private menuService: MenuService) { }

  ngOnInit() {
  }

  getSelectedTable(): string {
    if (this.selectedTableLabel == '' || this.selectedZone == ''){
      return '';
    } else {
      return this.selectedZone + this.selectedTableLabel;
    }
  }

}
