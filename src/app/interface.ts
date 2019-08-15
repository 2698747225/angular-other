export interface JsonDataInterface {
  idx: number;
  level: string;
  typeList: TypeList[];
}

interface TypeList {
  typeName: string;
  typeIdx: number;
  otherDetail: OtherDetail[];
}

interface OtherDetail {
  module: string;
  detail: string;
  workTime: number;
  price: number;
}

export interface TableListInterface {
  idx: number;
  level: string;
  idxLength: number;
  idxFix: boolean;
  typeName: string;
  typeLength: number;
  typeFix: boolean;
  typeIdx: number;
  module: string;
  describe: string;
  workTime: number;
  price: number;
}
