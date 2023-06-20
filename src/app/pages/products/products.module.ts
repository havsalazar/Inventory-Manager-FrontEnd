import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NbActionsModule, NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbPopoverModule } from '@nebular/theme';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MODULE_NAME } from 'src/app/core/Inyectors/service.inyector';
import { GeneralService } from 'src/app/core/Services/general.service';
import { CheckboxModule } from 'primeng/checkbox';

import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@NgModule({
  providers: [
    {
      provide: MODULE_NAME, useValue: 'product',
    },
    GeneralService,
    
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
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
    CheckboxModule ,
    ImageModule,
    FileUploadModule,
    CardModule,
    ToastModule,
    ConfirmDialogModule
  ]
})
export class ProductsModule { }
