import { Page404Component } from './../authentication/page404/page404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EnvelopDetailsComponent } from './envelop-details/envelop-details.component';
import { EnvelopTableComponent } from './envelop-table/envelop-table.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'envelop-details/:id',
    component: EnvelopDetailsComponent,
  },
  {
    path: 'envelop-table',
    component: EnvelopTableComponent,
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
