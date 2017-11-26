import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CategoryMenuItem } from '../../configuration/configuration.component';
import { MenuItem } from '../../services/menu.service';

import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-menu-view',
  templateUrl: './menu-view.component.html',
  styleUrls: ['./menu-view.component.css']
})
export class MenuViewComponent implements OnInit, OnChanges {

  public datasource: MenuDataSource;

  @Input('menus')
  menus: CategoryMenuItem;

  @Output()
  onDelete: EventEmitter<MenuItem> = new EventEmitter<MenuItem>();


  displayedColumns = ["name", "price", "actions"];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    console.debug("Update menus datasource");
    if (this.menus != null){
      this.datasource = new MenuDataSource(this.menus.menus);
    }
  }

  remove(item: MenuItem){
    this.onDelete.emit(item);
  }

}

export class MenuDataSource extends DataSource<any>{

  constructor(public menus: MenuItem[]){
    super();
  }

  connect(): Observable<MenuItem[]>{
    return Observable.of(this.menus);
  }

  disconnect(){}
}
