import { Routes } from '@angular/router';
import { Login } from './Pages/login/login';
import { Register } from './Pages/register/register';
import { Template } from './Pages/template/template';
import { Products } from './Pages/products/products';
import { ProductsCreate } from './Pages/products-create/products-create';

export const routes: Routes = [
    { path: '', component: Login, title: 'login'},
    { path: 'register', component: Register, title: 'register'},
    { path: 'template', component: Template, children: [
      { path: 'products', component: Products, title: 'products'},
      { path: 'products/create', component: ProductsCreate, title: 'create-product'}
    ]}
];
