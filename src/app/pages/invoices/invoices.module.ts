import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesComponent } from './invoices.component';
import { InvoiceCreationComponent } from './invoice-creation/invoice-creation.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { DividerModule } from 'primeng/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbActionsModule, NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule, NbPopoverModule } from '@nebular/theme';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MODULE_NAME } from 'src/app/core/Inyectors/service.inyector';
import { GeneralService } from 'src/app/core/Services/general.service';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  providers: [
    {
      provide: MODULE_NAME, useValue: 'invoices',
    },
    GeneralService,
    
  ],
  declarations: [
    InvoicesComponent,
    InvoiceCreationComponent,
    InvoiceListComponent,
    InvoiceDetailComponent
  ],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DividerModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbActionsModule,
    ButtonModule,
    NbPopoverModule,
    NbFormFieldModule,
    NbIconModule,
    AutoCompleteModule,
    DropdownModule,
  ]
})
export class InvoicesModule { }
