import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import {
  NbThemeModule,
  NbLayoutModule,
  NbSidebarModule,
  NbMenuModule,
  NbUserModule,
  NbSelectModule,
  NbActionsModule,
  NbContextMenuModule,
  NbIconModule,

} from '@nebular/theme';
import { FooterComponent } from './../core/components/footer/footer.component';
import { HeaderComponent } from './../core/components/header/header.component';
import { NbSecurityModule } from '@nebular/security'; 
import { L10nDisplayNamesPipe, L10nTranslatePipe } from 'angular-l10n';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [
    MainComponent,
    FooterComponent,
    HeaderComponent, 
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    NbThemeModule,
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbSecurityModule.forRoot(),
    NbUserModule,
    NbSelectModule,
    NbActionsModule,
    NbContextMenuModule,
    NbIconModule,
    L10nTranslatePipe,
    L10nDisplayNamesPipe,
     DropdownModule ,
     FormsModule,
     DynamicDialogModule
  ],
  providers:[
    DynamicDialogRef,DynamicDialogConfig
  ]
})
export class MainModule { }
