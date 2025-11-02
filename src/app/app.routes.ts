import { Routes } from '@angular/router';
import { Login } from './Pages/login/login';
import { Register } from './Pages/register/register';
import { Template } from './Pages/template/template';
import { Products } from './Pages/products/products';
import { ProductsCreate } from './Pages/products-create/products-create';
import { CategoriesComponent } from './Pages/categories/categories';
import { CategoriesCreateComponent } from './Pages/categories-create/categories-create';

import { CategoriesEditComponent } from './Pages/categories-edit/categories-edit';
import { ProductCardsComponent } from './Pages/product-cards/product-cards';

export const routes: Routes = [
    { path: '', component: Login, title: 'login'},
    { path: 'register', component: Register, title: 'register'},
    { path: '', component: Template, children: [
      { path: 'products', component: Products, title: 'products'},
      { path: 'products/create', component: ProductsCreate, title: 'create-product'},
      { path: 'categories', component: CategoriesComponent, title: 'categories'},
      { path: 'categories/create', component: CategoriesCreateComponent, title: 'create-category'},
      { path: 'category-edit/:id', component: CategoriesEditComponent, title: 'edit-category'},
      { path: 'product-cards', component: ProductCardsComponent, title: 'product-cards'}
    ]}
];