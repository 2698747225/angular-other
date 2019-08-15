import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flex-test',
  templateUrl: './flex-test.component.html',
  styleUrls: ['./flex-test.component.css']
})
export class FlexTestComponent implements OnInit {
  test = { a: { b: 1 } };
  constructor() { }

  ngOnInit() {

  }

  add() {
    this.test.a.b = 2;
    // this.test.a = 1;
  }
}
