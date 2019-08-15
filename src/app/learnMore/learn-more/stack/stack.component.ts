import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.css']
})
export class StackComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  maopao(arr: number[]): number[] {
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    return arr;
  }

  charu(arr: number[]): number[] {
    for (let i = 1; i < arr.length; i++) {
      const temp = arr[i];
      for (let j = i - 1; j >= 0; j--) {
        if (temp < arr[j]) {
          arr[j + 1] = arr[j];
          arr[j] = temp;
        } else {
          break;
        }
      }
    }
    return arr;
  }

  jiandan(arr: number[]): number[] {
    for (let i = 0; i < arr.length - 1; i++) {
      let minIndex = i;
      for (let j = i; j < arr.length; j++) {
        if (arr[minIndex] > arr[j]) {
          minIndex = j;
        }
      }
      const temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }
    return arr;
  }

  shellSort(arr: number[]): number[] {
    const len = arr.length;
    for (let gap = Math.floor(len / 2); gap >= 1; gap = Math.floor(gap / 2)) {
      for (let right = gap; right < arr.length; right++) {
        const temp = arr[right];
        let left = right - gap;
        for (; left >= 0 && arr[left] >= temp; left -= gap) {
          if (arr[left + gap] <= arr[left]) {
            arr[left + gap] = arr[left];
          }
        }
        arr[left + gap] = temp;
      }
    }
    return arr;
  }

  fastSort(arr: number[]): number[] {
    if (arr.length === 1) {
      return arr;
    }
    const mid = arr.splice(Math.floor(arr.length / 2), 1)[0];
    const left = [];
    const right = [];
    arr.forEach(item => {
      if (item <= mid) {
        left.push(item);
      } else {
        right.push(item);
      }
    });
    return this.fastSort(left).concat([mid], this.fastSort(right));
  }
}
/**
 * xss跨站脚本攻击
 * 前端对页面输入的信息进行校验，防止输入非法信息，后端防止非法信息入库
 * 服务器到浏览器的数据进行输出编码
 * 设置cookie时，同时设置httpOnly，防止脚本获取cookie
 * WAF 网络防火墙
 *
 * CSRF跨站请求伪造
 * 请求头中加入Refered信息，添加请求来源路径，后端对Refered进行校验
 * 请求中加入token
 * 在关键的地方加入验证码
 */
