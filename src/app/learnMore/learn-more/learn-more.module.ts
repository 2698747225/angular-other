import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearnMoreRoutingModule } from './learn-more-routing.module';
import { StackComponent } from './stack/stack.component';

@NgModule({
  imports: [
    CommonModule,
    LearnMoreRoutingModule
  ],
  declarations: [StackComponent]
})
export class LearnMoreModule { }
