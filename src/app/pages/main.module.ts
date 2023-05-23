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
  ]
})
export class MainModule { }
