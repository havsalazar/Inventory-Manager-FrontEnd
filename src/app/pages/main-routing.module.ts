import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            
            { path: 'home', component: HomeComponent },
            // { path: 'scheduler', loadChildren: () => import('./scheduler/scheduler.module').then(m => m.SchedulerModule) },
            { path: 'suppliers', loadChildren: () => import('./supplier/supplier.module').then(m => m.SupplierModule) },
            { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
            { path: 'clients', loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule) },
            { path: 'invoices', loadChildren: () => import('./invoices/invoices.module').then(m => m.InvoicesModule) },
            // { path: '', redirectTo: 'home' },
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
