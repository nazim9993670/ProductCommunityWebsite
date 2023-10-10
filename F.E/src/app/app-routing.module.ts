import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './authGuard/admin.guard';
import { UserGuard } from './authGuard/user.guard';
import { AddProductsComponent } from './components/admin/add-products/add-products.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminProductListComponent } from './components/admin/admin-product-list/admin-product-list.component';
import { AdminRegisterComponent } from './components/admin/admin-register/admin-register.component';
import { AdminSearchResultComponent } from './components/admin/admin-search-result/admin-search-result.component';
import { AdminViewProductsComponent } from './components/admin/admin-view-products/admin-view-products.component';
import { HomeComponent } from './components/home/home.component';
import { AskReviewComponent } from './components/product-review/ask-review/ask-review.component';
import { PostReviewComponent } from './components/product-review/post-review/post-review.component';
import { ProductsComponent } from './components/product/product-list/product-list.component';
import { ProductSearchComponent } from './components/productSearch/product-search/product-search.component';
import { SearchPageComponent } from './components/productSearch/search-page/search-page.component';
import { SelectAccountComponent } from './components/select-account/select-account.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { UserRegisterComponent } from './components/user/user-register/user-register.component';
import { ViewProductComponent } from './components/view-product/view-product.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'

  },
  {
    path: "adminLogin",
    component: AdminLoginComponent,
    pathMatch: 'full'
  },

  {
    path: "userLogin",
    component: UserLoginComponent,
    pathMatch: 'full'
  },
  {
    path: "userRegister",
    component: UserRegisterComponent,
    pathMatch: 'full'
  },
  {
    path: "adminRegister",
    component: AdminRegisterComponent,
    pathMatch: 'full'

  },
  {
    path: "products",
    component: ProductsComponent,
    canActivate: [UserGuard],
  },
  {
    path: "view-product/:id",
    component: ViewProductComponent,
    canActivate: [UserGuard]
  },
  {
    path: "search-results/:p",
    component: ProductSearchComponent,
    canActivate: [UserGuard]
  },
  {
    path: "post-review/:id",
    component: PostReviewComponent,
    canActivate: [UserGuard]
  },
  {
    path: "ask-reviews",
    component: AskReviewComponent,
    canActivate: [UserGuard]
  },
  {
    path: "search-page",
    component: SearchPageComponent,
    canActivate: [UserGuard]
  },
  {
    path: "select-account",
    component: SelectAccountComponent,
    pathMatch: 'full'
  },
  {
    path: "admin-dashboard",
    component: AdminDashboardComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "admin-products",
    component: AdminProductListComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "admin-viewProduct/:id",
    component: AdminViewProductsComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "admin-searchResult/:p",
    component: AdminSearchResultComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "add-product",
    component: AddProductsComponent,
    canActivate: [AdminGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
