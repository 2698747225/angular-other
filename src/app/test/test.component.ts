import { Component, OnInit } from '@angular/core';
import * as Server from 'ws';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const wsServer = new Server({ port: 8085 });
    //当有任何一个客户端连接到服务器时，给这个客户端推送一条消息
    wsServer.on("connection", websocket => {
      websocket.send("这个消息是服务器主动推送的");
    });
  }

  maopao(arr) {
    for (let i = arr.length - 1; i >= 1; i--) {
      for (let j = 0; j <= i; j++) {
        if (arr[j] > arr[j + 1]) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    console.log(arr);
  }

  jiandan(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
      let minIndex = i;
      for (let j = i; j < arr.length; j++) {
        if (arr[minIndex] > arr[j]) {
          minIndex = j;
        }
      }
      const temp = arr[minIndex];
      arr[minIndex] = arr[i];
      arr[i] = temp;
    }
    console.log(arr);
  }

  // 6,4,67,8,3,1,3,5,67,7
  charu(arr) {
    for (let i = 1; i < arr.length; i++) {
      const temp = arr[i];
      for (let j = i - 1; j >= 0; j--) {
        if (temp <= arr[j]) {
          arr[j + 1] = arr[j];
          arr[j] = temp;
        } else {
          arr[j + 1] = temp;
          break;
        }
      }
    }
    console.log(arr);
  }

  shellSort(arr) {
    for (let gap = Math.floor(arr.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
      for (let right = gap; right < arr.length; right++) {
        const temp = arr[right];
        let left = right - gap;
        for (; left >= 0; left -= gap) {
          if (temp > arr[left]) {
            break;
          } else {
            arr[left + gap] = arr[left];
            arr[left] = temp;
          }
        }
      }
    }
    console.log(arr);
  }

  fastSort(arr) {
    // 注意二分到最后，有可能数组为空，因此不能只通过length===1判断
    if (arr && arr.length <= 1) {
      return arr;
    }
    const centerNode = arr.splice(Math.floor(arr.length / 2), 1)[0];
    const right = [], left = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > centerNode) {
        right.push(arr[i]);
      } else {
        left.push(arr[i]);
      }
    }
    return this.fastSort(left).concat([centerNode], this.fastSort(right));
  }
}
