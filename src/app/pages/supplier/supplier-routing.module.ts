import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';

const routes: Routes = [
  
  {path: 'supplier-list', pathMatch:'full', component:SupplierListComponent},
  {path: 'supplier-detail/:id', component:SupplierDetailComponent},
  {path: '', pathMatch:'full', redirectTo:'supplier-list'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
