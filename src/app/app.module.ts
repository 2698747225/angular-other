import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { LearnMoreModule } from './learnMore/learn-more/learn-more.module';
import { TestComponent } from './test/test.component';
import { AppRouteModule } from './app.route';
import { TreeComponent } from './learnMore/tree/tree.component';
// import { LearnMoreRoutingModule } from './learnMore/learn-more/learn-more-routing.module';
// import { StackComponent } from './learnMore/learn-more/stack/stack.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    TreeComponent,
    // StackComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    AppRouteModule
    // LearnMoreRoutingModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
