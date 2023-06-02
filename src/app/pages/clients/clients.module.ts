import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientListComponent } from './client-list/client-list.component'; 
import { GeneralService } from 'src/app/core/Services/general.service';
import { MODULE_NAME } from 'src/app/core/Inyectors/service.inyector';
import { ReactiveFormsModule } from '@angular/forms';
import { NbActionsModule, NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbPopoverModule } from '@nebular/theme';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService } from 'primeng/dynamicdialog';


@NgModule({
  providers: [
    {
      provide: MODULE_NAME, useValue: 'client',
    },
    GeneralService 
  ],
  declarations: [ 
  
    ClientDetailComponent, ClientListComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    ReactiveFormsModule,  
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
    DropdownModule
  ]
})
export class ClientsModule { }
