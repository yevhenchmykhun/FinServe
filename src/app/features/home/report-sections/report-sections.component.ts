import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ReportSection } from '../model/report-section';
import { Report } from '../model/report';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-report-sections',
  templateUrl: './report-sections.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportSectionsComponent implements OnChanges {

  @Input()
  report!: Report;

  rows!: ReportSection[];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['report']) {
      this.rows = this.report.sections ?? [];
    }
  }

  getTableRowClass(reportSection: ReportSection): string {
    switch (reportSection.status) {
      case 'Completed':
        return 'app-table-tr-completed';
      case 'Failed':
        return 'app-table-tr-failed';
      default:
        return 'app-table-tr-unknown';
    }
  }

}
