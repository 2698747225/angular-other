import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexTestComponent } from './flex-test/flex-test.component';
import { Routes, RouterModule } from '@angular/router';
import { ChildrenComponent } from './children/children.component';

const routes = [{
  path: 'flex',
  component: FlexTestComponent
}];

@NgModule({
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)],
  ],
  exports: [RouterModule],
  declarations: [FlexTestComponent, ChildrenComponent]

})
export class FlexTestModule { }
