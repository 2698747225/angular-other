import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { JsonDataInterface, TableListInterface } from './interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy {
  tableDataFm: FormArray;
  tableList: any[];
  priceValue: number;
  preview: boolean = false;
  sum: number = 0;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('data'))) {
      this.testData = JSON.parse(localStorage.getItem('data'));
    }
    this.tableList = this.groupViewData(this.testData);
    this.testData = this.listFormatObj(this.tableList.filter(item => item.idx));
    this.calTotal();
  }

  // 根据对象数据转换为数组
  groupViewData(list: JsonDataInterface[]): (TableListInterface & { addBtnType: string; idx: number, typeName: string })[] {
    const array = [];
    list.forEach((itemIdx) => {
      let indexLength = 0;
      itemIdx.typeList.forEach(item => {
        indexLength += (!this.preview ? item.otherDetail.length + 1 : item.otherDetail.length);
      });
      itemIdx.typeList.forEach((itemType, index2) => {
        itemType.otherDetail.forEach((itemDetail, index3) => {
          const obj = {
            idx: itemIdx.idx,
            level: itemIdx.level,
            idxLength: indexLength,
            idxFix: index3 === 0 && index2 === 0,
            typeName: itemType.typeName,
            typeLength: itemType.otherDetail.length,
            typeFix: index3 === 0,
            typeIdx: index2,
            module: itemDetail.module,
            describe: itemDetail.detail,
            workTime: itemDetail.workTime,
            price: itemDetail.price
          }
          array.push(obj);
        });
        if (!this.preview) {
          // 添加模块空行
          array.push({ addBtnType: 'module', idx: itemIdx.idx, typeName: itemType.typeName });
        }
      });
      if (!this.preview) {
        // 添加类别空行
        array.push({ addBtnType: 'type', idx: itemIdx.idx, });
      }
    });
    if (!this.preview) {
      // 添加阶段空行
      array.push({ addBtnType: 'level' });
    }
    array.map(item => {
      item
    });
    return array;
  }

  testData: JsonDataInterface[] = [{
    idx: 1,
    level: '开发',
    typeList: [{
      typeName: '前台',
      typeIdx: 0,
      otherDetail: [{
        module: '注册页',
        detail: ['协议', '性别', '年龄', '电话'].join('\r\n'),
        workTime: 1,
        price: 1
      }]
    }]
  }]

  // 数组转换为对象
  listFormatObj(list: (TableListInterface & { addBtnType: string; idx: number, typeName: string })[]): JsonDataInterface[] {
    const array = [];
    list.filter(item => !item.addBtnType).forEach(item => {
      const idxObj = array.find(data => data.idx === item.idx);
      if (idxObj) {
        const typeObj = idxObj.typeList.find(data => data.typeIdx === item.typeIdx);
        if (typeObj) {
          typeObj.otherDetail.push({
            module: item.module,
            detail: item.describe,
            workTime: item.workTime,
            price: item.price
          });
        } else {
          idxObj.typeList.push({
            typeName: item.typeName,
            typeIdx: item.typeIdx,
            otherDetail: [{
              module: item.module,
              detail: item.describe,
              workTime: item.workTime,
              price: item.price
            }]
          });
        }
      } else {
        array.push({
          idx: item.idx,
          level: item.level,
          typeList: [{
            typeName: item.typeName,
            typeIdx: item.typeIdx,
            otherDetail: [{
              module: item.module,
              detail: item.describe,
              workTime: item.workTime,
              price: item.price
            }]
          }]
        });
      }
    });
    return array;
  }

  // 添加
  add(index: number, btnItem, type: string): void {
    const obj = {
      idx: null,
      level: '',
      idxLength: 1,
      idxFix: false,
      typeName: '',
      typeLength: 1,
      typeFix: false,
      module: '',
      describe: '',
      workTime: 0,
      price: null
    };
    switch (type) {
      case 'module': {
        const { idx, level, idxLength, typeName, typeLength, typeList, idxList, typeIdx } = this.tableList[index - 1];
        const newObj = Object.assign(obj, {
          idx: idx,
          level: level,
          idxLength: idxLength,
          typeName: typeName,
          typeLength: typeLength,
          typeIdx: typeIdx
        });
        this.tableList.splice(index, 0, newObj);
        this.tableList.filter(item => item.idx === idx).forEach(item => {
          ++item.idxLength;
        });
        this.tableList.filter((item, indx) => indx >= index - typeLength && indx <= index).forEach(item => {
          ++item.typeLength;
        });
      }
        break;
      case 'type': {
        const { idx, level, idxLength, typeList, idxList, typeIdx } = this.tableList[index - 2];
        this.tableList.splice(index, 0, Object.assign(obj, {
          idx: idx,
          level: level,
          idxLength: idxLength,
          typeFix: true,
          typeList: typeList,
          typeIdx: typeIdx + 1
        }));
        this.tableList.splice(index + 1, 0, { addBtnType: 'module' });
        this.tableList.filter(item => !item.addBtnType).filter(item => item.idx === idx).forEach(item => {
          item.idxLength += 2;
        });
      }
        break;
      case 'level': {
        const { idx } = this.tableList[index - 3];
        this.tableList.splice(index, 0, Object.assign(obj, {
          idx: idx + 1,
          idxFix: true,
          typeFix: true,
          idxLength: 2,
          typeIdx: 0
        }));
        this.tableList.splice(index + 1, 0, { addBtnType: 'module' });
        this.tableList.splice(index + 2, 0, { addBtnType: 'type' });
      }
        break;
    }
    this.modelChange();
  }

  // 删除
  delete(index: number, type: string): void {
    switch (type) {
      case 'module': {
        const self = this;
        const { idx, typeLength, typeIdx } = this.tableList[index];
        // 模块只有一条无法删除
        if (typeLength === 1) {
          this.message.error('无法删除该模块！');
        } else {
          if (this.tableList[index].idxFix) {
            this.tableList[index + 1].idxFix = true;
          }
          if (this.tableList[index].typeFix) {
            this.tableList[index + 1].typeFix = true;
          }
          this.tableList.splice(index, 1);
          this.tableList.filter(item => item.idx === idx && item.typeIdx === typeIdx).forEach(item => {
            --item.typeLength;
          });
          this.tableList.filter(item => item.idx === idx).forEach(item => {
            --item.idxLength;
          });
        }
      }
        break;
      case 'type': {
        const { idxLength, typeLength, idx, typeIdx } = this.tableList[index];
        if (idxLength === 1) {
          this.message.error('无法删除该类别！');
        } else {
          if (this.tableList[index].idxFix) {
            this.tableList.find(item => item.idx === idx && item.typeIdx === typeIdx + 1).idxFix = true;
            this.tableList.find(item => item.idx === idx && item.typeIdx === typeIdx + 1).typeFix = true;
          }
          this.tableList.splice(index, typeLength + 1);
          // 更新索引
          this.tableList.filter(item => item.idx === idx && item.typeIdx > typeIdx).forEach(item => {
            --item.typeIdx;
          });
          this.tableList.filter(item => item.idx === idx).forEach(item => {
            item.idxLength -= (typeLength + 1);
          });
        }
      }
        break;
      case 'level': {
        const { idxLength, idx } = this.tableList[index];
        if (this.tableList.length <= 1) {
          this.message.error('无法删除该阶段！');
        } else {
          if (this.tableList[index].idxFix) {
            this.tableList.find(item => item.idx === idx + 1).idxFix = true;
            this.tableList.find(item => item.idx === idx + 1).typeFix = true;
          }
          this.tableList.splice(index, idxLength + 1);
          // 更新索引
          this.tableList.filter(item => item.idx > idx).forEach(item => {
            --item.idx;
          });
        }
      }
        break;
    }
    this.modelChange();
  }

  // 预览切换
  previewfn(): void {
    this.preview = !this.preview;
    this.testData = JSON.parse(localStorage.getItem('data'));
    this.tableList = this.groupViewData(this.testData);
  }

  // 数据变化
  modelChange(): void {
    this.calTotal();
    this.setStorage();
  }

  setStorage(): void {
    const jsonStr = JSON.stringify(this.listFormatObj(this.tableList));
    localStorage.setItem('data', jsonStr);
    console.log(this.listFormatObj(this.tableList));
  }

  calTotal(): void {
    let sum = 0;
    if (this.priceValue) {
      this.tableList.filter(item => !item.addBtnType).forEach(item => {
        sum += item.workTime * this.priceValue;
      })
    }
    this.sum = sum;
  }

  ngOnDestroy() {

  }
  /**
   * 数组栈
   */
  stack() {

  }
}


