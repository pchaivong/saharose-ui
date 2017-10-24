import { Component, OnInit, Input } from '@angular/core';
import { OrderDetailData } from '../../services/order.service';

@Component({
  selector: 'app-order-detail-item',
  templateUrl: './order-detail-item.component.html',
  styleUrls: ['./order-detail-item.component.css']
})
export class OrderDetailItemComponent implements OnInit {

  @Input('detail')
  orderDetail: OrderDetailData;

  constructor() {}

  ngOnInit() {
  }

}
