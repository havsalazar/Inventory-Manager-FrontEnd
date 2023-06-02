import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';

const routes: Routes = [
  
  {path: 'list', pathMatch:'full', component:SupplierListComponent},
  {path: 'detail', component:SupplierDetailComponent},
  {path: 'detail/:id', component:SupplierDetailComponent},
  {path: '', pathMatch:'full', redirectTo:'list'},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
