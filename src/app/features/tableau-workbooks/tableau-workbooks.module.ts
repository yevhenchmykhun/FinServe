import { NgModule } from '@angular/core';
import { TableauWorkbooksComponent } from './tableau-workbooks.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TableauWorkbooksComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    TableModule,
    ButtonModule,
    CalendarModule
  ]
})
export class TableauWorkbooksModule { }
