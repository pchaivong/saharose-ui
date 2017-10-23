import { Injectable } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';

import { MenuData } from './menu.service';

@Injectable()
export class OrderService {

  orderDataSource: OrderDataSource;

  constructor() { 
    this.orderDataSource = new OrderDataSource(this);
  }

  refresh(): OrderDataSource {
    this.orderDataSource = new OrderDataSource(this);
    return this.orderDataSource;
  }

  list(): Observable<OrderData[]> {
    return Observable.of(mockData);
  }

  add(order: OrderData){
    mockData.push(order);
  }

}

export interface OrderDetailData {
  id: number,
  menu: MenuData,
}

export interface OrderData {
  id: number,
  details: OrderDetailData[]
}

export class OrderDataSource extends DataSource<any> {
  constructor(private orderService: OrderService){
    super();
  }

  connect(): Observable<OrderData[]> {
    return this.orderService.list();
  }

  disconnect(){}
}


// Mock
let mockData: OrderData[] = []
let nextOrderId: number = 1;
let nextOrderDetailId: number = 1;


