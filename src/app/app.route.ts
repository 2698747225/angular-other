import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';
import { TreeComponent } from './learnMore/tree/tree.component';

// import { StackComponent } from './stack/stack.component';
const routes: Routes = [{
  path: 'test',
  component: TestComponent
}, {
  path: 'tree',
  component: TreeComponent
}, {
  path: 'flex',
  loadChildren: './flex-test/flex-test.module#FlexTestModule'
}, {
  path: 'service',
  loadChildren: './service-work/service-work.module#ServiceWorkModule'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouteModule { }
