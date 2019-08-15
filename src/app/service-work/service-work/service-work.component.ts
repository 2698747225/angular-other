import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-work',
  templateUrl: './service-work.component.html',
  styleUrls: ['./service-work.component.css']
})
export class ServiceWorkComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./serviceWorker.js').then(register => {
          console.log('success');
        }, err => {
          console.log('error');
        })
      });
    }
  }

}
