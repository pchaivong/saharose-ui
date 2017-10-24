import { Component, OnInit, Input } from '@angular/core';
import { OrderDetailData } from '../../services/order.service';

@Component({
  selector: 'app-order-detail-list',
  templateUrl: './order-detail-list.component.html',
  styleUrls: ['./order-detail-list.component.css']
})
export class OrderDetailListComponent implements OnInit {

  @Input()
  items: OrderDetailData[];

  constructor() { }

  ngOnInit() {
  }

}
