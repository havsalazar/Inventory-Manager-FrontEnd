import { NbLayoutModule } from '@nebular/theme';
import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchedulerRoutingModule } from './scheduler-routing.module';
import { SchedulerComponent } from './scheduler.component';
 
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';

@NgModule({
  declarations: [
    SchedulerComponent,
    
  ],
  imports: [
    CommonModule, 
    SchedulerRoutingModule,
    NbLayoutModule
  ],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],

})
export class SchedulerModule { }
