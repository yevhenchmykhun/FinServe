import { Component, OnInit, inject } from '@angular/core';
import { Report } from '../model/report';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html'
})
export class ReportsComponent implements OnInit {

  rows!: Report[];

  private readonly dataService = inject(DataService);

  ngOnInit(): void {
    this.dataService.getReports().subscribe(reports => {
      this.rows = reports;
    });
  }

  getTableRowClass(report: Report): string {
    switch (report.status) {
      case 'Completed':
        return 'app-table-tr-completed';
      case 'Failed':
        return 'app-table-tr-failed';
      default:
        return 'app-table-tr-unknown';
    }
  }

}
