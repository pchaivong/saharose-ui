import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrderDetailComponent } from './create-order-detail.component';

describe('CreateOrderDetailComponent', () => {
  let component: CreateOrderDetailComponent;
  let fixture: ComponentFixture<CreateOrderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
