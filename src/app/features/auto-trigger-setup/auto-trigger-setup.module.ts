import { NgModule } from '@angular/core';
import { AutoTriggerSetupComponent } from './auto-trigger-setup.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { ConditionsComponent } from './conditions/conditions.component';
import { TriggersComponent } from './triggers/triggers.component';
import { TabMenuModule } from 'primeng/tabmenu';

const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  {
    title: 'Auto Trigger Setup / Tasks',
    path: 'tasks',
    component: TasksComponent
  },
  {
    title: 'Auto Trigger Setup / Conditions',
    path: 'conditions',
    component: ConditionsComponent
  },
  {
    title: 'Auto Trigger Setup / Triggers',
    path: 'triggers',
    component: TriggersComponent
  }
];

@NgModule({
  declarations: [
    AutoTriggerSetupComponent,
    TasksComponent,
    ConditionsComponent,
    TriggersComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    TabMenuModule
  ]
})
export class AutoTriggerSetupModule { }
