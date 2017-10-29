import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientViewComponent } from './ingredient-view.component';

describe('IngredientViewComponent', () => {
  let component: IngredientViewComponent;
  let fixture: ComponentFixture<IngredientViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
