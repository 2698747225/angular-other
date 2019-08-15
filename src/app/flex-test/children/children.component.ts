import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildrenComponent implements OnInit {
  json = JSON;
  @Input() test;

  constructor() { }

  ngOnInit() {
  }

}
