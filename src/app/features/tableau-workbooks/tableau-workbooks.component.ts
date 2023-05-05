import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { TableauWorkbook } from './model/tableau-workbook';
import { AuthService } from 'src/app/core/services/auth.service';
import { Observable } from 'rxjs';
import { UserRole } from 'src/app/core/model/user-role.enum';
import { DataService } from 'src/app/core/services/data.service';
import { SubSink } from 'subsink';
import { TableauWorkbookStatus } from './model/tableau-workbook-status';
import { MessageService, SortMeta } from 'primeng/api';
import { epochMatchModeOptions } from 'src/app/core/util/util';

@Component({
  templateUrl: './tableau-workbooks.component.html'
})
export class TableauWorkbooksComponent implements OnInit, OnDestroy {

  private readonly dataService = inject(DataService);

  private readonly authService = inject(AuthService);

  private readonly messageService = inject(MessageService);

  readonly epochMatchModeOptions = epochMatchModeOptions;

  readonly subs = new SubSink();

  rows!: TableauWorkbook[];

  selectedRows: TableauWorkbook[] = [];

  sortMeta: SortMeta[] = [
    { field: 'refreshStatus', order: 1 },
    { field: 'refreshTime', order: -1 }
  ];

  refreshing = false;

  ngOnInit(): void {
    this.subs.sink = this.dataService.getTableauWorkbooks()
      .subscribe(data => {
        this.rows = data;
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  hasAdminRole(): Observable<boolean> {
    return this.authService.hasRoles([UserRole.administrator]);
  }

  getTableRowClass(workbook: TableauWorkbook): string {
    switch (workbook.refreshStatus) {
      case TableauWorkbookStatus.success:
        return 'app-table-tr-completed';
      case TableauWorkbookStatus.inProgress:
        return 'app-table-tr-in-progress';
      case TableauWorkbookStatus.failed:
        return 'app-table-tr-failed';
      default:
        return 'app-table-tr-unknown';
    }
  }

  isRefreshButtonEnabled(): boolean {
    return !this.refreshing && this.selectedRows.length > 0;
  }

  isInProgress(workbook: TableauWorkbook): boolean {
    return workbook.refreshStatus === TableauWorkbookStatus.inProgress
  }

  isRowSelectable(event: { data: TableauWorkbook, index: number }): boolean {
    return !this.isInProgress(event.data);
  }

  onRefresh(): void {
    this.refreshing = true;
    const ids = this.selectedRows.map(row => row.id);
    this.dataService.refreshTableauWorkbooks(ids)
      .subscribe(refreshedWorkbooks => {
        if (refreshedWorkbooks.length) {

          // show toast
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `${this.selectedRows.length} workbook(s) refreshed`
          });

          // reset rows selection
          this.selectedRows = [];

          // replace refreshed workbook objects with updated objects from backend
          const workbooks = this.rows.filter(row => !ids.includes(row.id))
          this.rows = [...workbooks, ...refreshedWorkbooks];
        }
        this.refreshing = false;
      });

  }

}
