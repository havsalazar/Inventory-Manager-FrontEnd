import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { NbActionsModule, NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbPopoverModule, } from '@nebular/theme';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MODULE_NAME } from 'src/app/core/Inyectors/service.inyector';
import { GeneralService } from 'src/app/core/Services/general.service'; 
import { L10nTranslatePipe } from 'angular-l10n';


@NgModule({
  providers: [
    {
      provide: MODULE_NAME, useValue: 'supplier',
    },
    GeneralService,
  ],
  declarations: [
    SupplierDetailComponent,
    SupplierListComponent
  ],
  imports: [
    SupplierRoutingModule,
    ReactiveFormsModule,
    CommonModule,    
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    TableModule,
    ButtonModule,
    NbPopoverModule,
    NbFormFieldModule,
    NbIconModule,
    NbLayoutModule,
    L10nTranslatePipe, 
  ]
})
export class SupplierModule { }
