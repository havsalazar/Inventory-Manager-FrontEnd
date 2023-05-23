import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';
import { SupplierListComponent } from './supplier-list/supplier-list.component'; 
import { SupplierService } from './supplier.service';
import { NbActionsModule, NbButtonModule, NbCardModule, NbInputModule, NbPopoverModule,  } from '@nebular/theme'; 
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  providers:[
    SupplierService
  ],
  declarations: [
    SupplierDetailComponent,
    SupplierListComponent
  ],
  imports: [
    ReactiveFormsModule ,
    CommonModule,
    SupplierRoutingModule,
    NbInputModule,
    NbCardModule ,
    NbButtonModule,
    NbActionsModule, 
    TableModule,
    ButtonModule,
    NbPopoverModule
  ]
})
export class SupplierModule { }
