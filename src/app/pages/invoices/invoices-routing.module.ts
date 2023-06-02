import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceCreationComponent } from './invoice-creation/invoice-creation.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';

const routes: Routes = [
  {path:'create-new',component: InvoiceCreationComponent},
  {path:'detail/:id',component: InvoiceDetailComponent},
  {path:'list',component: InvoiceListComponent},
  {path:'', pathMatch:'full',redirectTo:'list'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }
