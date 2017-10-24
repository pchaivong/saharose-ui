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
         MdSelectModule,
         MatSlideToggleModule,
         MatTabsModule,
         MatButtonToggleModule,
         MdSidenavModule,
         MatListModule,
         MdChipsModule,
         MdFormFieldModule,
         MdMenuModule,
                          } from '@angular/material';
import { CookViewComponent } from './cook-view/cook-view.component';
import { CategoryComponent } from './category/category.component';


// Services
import { CategoryService } from './services/category.service';
import { IngredientService } from './services/ingredient.service';
import { MenuService } from './services/menu.service';
import { AuthService } from './services/auth.service';

import { DialogEditCategory, DialogAddCategory } from './category/category.component';
import { DialogAddMenu } from './menu/menu.component';
import { DialogAddOrderDetail } from './order/create-order/create-order.component';
import { IngredientComponent, DialogAddIngredient, DialogEditIngredient } from './ingredient/ingredient.component';
import { MenuComponent } from './menu/menu.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { CreateOrderDetailComponent } from './order/create-order-detail/create-order-detail.component';
import { CreateOrderComponent } from './order/create-order/create-order.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { LoginComponent } from './login/login.component';
import { UserAvatarComponent } from './user-avatar/user-avatar.component';

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
    CreateOrderDetailComponent,
    CreateOrderComponent,
    SidenavComponent,
    DialogAddOrderDetail,
    DialogAddMenu, 
    DialogAddCategory,
    DialogAddIngredient,
    DialogEditIngredient,
    LoginComponent,
    UserAvatarComponent
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
    MdSelectModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatButtonToggleModule,
    MdSidenavModule,
    MatListModule,
    MdChipsModule,
    MdFormFieldModule,
    MdMenuModule,

    RouterModule.forRoot([
      {
        path: 'order',
        component: CreateOrderComponent
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
    AuthService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogEditCategory, 
    DialogAddOrderDetail, 
    DialogAddMenu, 
    DialogAddCategory,
    DialogAddIngredient,
    DialogEditIngredient,
  ]
})
export class AppModule { }
