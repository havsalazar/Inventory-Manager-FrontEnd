import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component'; 

const routes: Routes = [
  {path: 'list', pathMatch:'full', component:ClientListComponent}, 
  {path: '', pathMatch:'full', redirectTo:'list'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
