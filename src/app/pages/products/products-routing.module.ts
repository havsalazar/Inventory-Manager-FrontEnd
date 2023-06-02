import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {path: 'list', pathMatch:'full', component:ProductListComponent},
  {path: 'detail', component:ProductDetailComponent},
  {path: 'detail/:id', component:ProductDetailComponent},
  {path: '', pathMatch:'full', redirectTo:'list'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
