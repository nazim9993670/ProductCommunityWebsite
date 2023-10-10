import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbModule, NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { UserRegisterComponent } from './components/user/user-register/user-register.component';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { UserGuard } from './authGuard/user.guard';
import { MatIconModule } from '@angular/material/icon';

import { ProductService } from './services/product/product.service';
import { UserService } from './services/user/user.service';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminRegisterComponent } from './components/admin/admin-register/admin-register.component';
import { AskReviewComponent } from './components/product-review/ask-review/ask-review.component';
import { PostReviewComponent } from './components/product-review/post-review/post-review.component';
import { ProductSearchComponent } from './components/productSearch/product-search/product-search.component';
import { SearchPageComponent } from './components/productSearch/search-page/search-page.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { ProductsComponent } from './components/product/product-list/product-list.component';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AdminService } from './services/admin/admin.service';
import { AdminGuard } from './authGuard/admin.guard';
import { SelectAccountComponent } from './components/select-account/select-account.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminProductListComponent } from './components/admin/admin-product-list/admin-product-list.component';
import { AdminViewProductsComponent } from './components/admin/admin-view-products/admin-view-products.component';
import { AdminSearchResultComponent } from './components/admin/admin-search-result/admin-search-result.component';
import { AddProductsComponent } from './components/admin/add-products/add-products.component';
import { FormsModule } from '@angular/forms';
import { DummyComponent } from './dummy/dummy.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminLoginComponent,
    NavbarComponent,
    UserLoginComponent,
    UserRegisterComponent,
    AdminRegisterComponent,
    ProductsComponent,
    AskReviewComponent,
    PostReviewComponent,
    ProductSearchComponent,
    SearchPageComponent,
    ViewProductComponent,
    SelectAccountComponent,
    AdminDashboardComponent,
    AdminProductListComponent,
    AdminViewProductsComponent,
    AdminSearchResultComponent,
    AddProductsComponent,
    DummyComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    FormsModule
  ],
  providers: [UserService, UserGuard, ProductService, AdminService, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
