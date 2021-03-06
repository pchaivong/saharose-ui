import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MdToolbarModule,
         MdTableModule,
         MatExpansionModule,
         MatCardModule,
         MatInputModule,
         MatButtonModule,
         MatIconModule,
         MatDialogModule,
         MatFormFieldModule,
         MatSelectModule,
         MatSlideToggleModule,
                          } from '@angular/material';
import { CookViewComponent } from './cook-view/cook-view.component';
import { CategoryComponent } from './category/category.component';


// Services
import { CategoryService } from './services/category.service';
import { IngredientService } from './services/ingredient.service';
import { MenuService } from './services/menu.service';

import { DialogEditCategory } from './category/category.component';
import { IngredientComponent } from './ingredient/ingredient.component';
import { MenuComponent } from './menu/menu.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { CreateOrderDetailComponent } from './order/create-order-detail/create-order-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolBarComponent,
    CookViewComponent,
    CategoryComponent,
    DialogEditCategory,
    IngredientComponent,
    MenuComponent,
    ConfigurationComponent,
    CreateOrderDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdToolbarModule,
    MdTableModule,
    MatCardModule,
    MatExpansionModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSlideToggleModule,

    RouterModule.forRoot([
      {
        path: 'categories',
        component: CategoryComponent
      },
      {
        path: 'ingredients',
        component: IngredientComponent
      },
      {
        path: 'menus',
        component: MenuComponent
      },
      {
        path: 'configuration',
        component: ConfigurationComponent
      }
    ]),
  ],
  providers: [
    CategoryService,
    IngredientService,
    MenuService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogEditCategory]
})
export class AppModule { }
