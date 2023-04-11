import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { ReportsComponent } from './reports/reports.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ReportSectionsComponent } from './report-sections/report-sections.component';

@NgModule({
  imports: [
    SharedModule,
    TableModule,
    InputTextModule,
    ButtonModule
  ],
  declarations: [
    HomeComponent,
    ReportsComponent,
    ReportSectionsComponent
  ]
})
export class HomeModule { }
