import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceWorkComponent } from './service-work/service-work.component';
import { Routes, RouterModule } from '@angular/router';

const routes = [{
  path: 'flex',
  component: ServiceWorkComponent
}];

@NgModule({
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)],
  ],
  declarations: [ServiceWorkComponent]
})
export class ServiceWorkModule { }
