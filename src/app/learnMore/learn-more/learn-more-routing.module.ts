import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StackComponent } from './stack/stack.component';
const routes: Routes = [{
  // path: 'stack',
  // component: StackComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class LearnMoreRoutingModule { }
