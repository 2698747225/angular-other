import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {
  rootTree = { left: null, right: null, data: null };
  constructor() { }

  ngOnInit() {
    // 生成一个二叉树
    this.initTree(20);
    for (let i = 0; i < 10; i++) {
      this.insert(Math.floor(Math.random() * 40));
    }
    console.log(this.rootTree);
    console.log(this.inOrder());
    console.log(this.preOrder());
    console.log(this.postOrder());
    console.log(this.getMin(this.rootTree));
    console.log(this.getMax(this.rootTree));
    console.log(this.search(28));
    this.delete(this.rootTree, 28);
  }

  // 初始化二叉树
  initTree(value: number) {
    this.rootTree.data = value;
  }

  insert(value: number) {
    const insertNode = (node, data) => {
      if (node.data > data) {
        if (node.left) {
          insertNode(node.left, data);
        } else {
          node.left = newNode;
        }
      } else {
        if (node.right) {
          insertNode(node.right, data);
        } else {
          node.right = newNode;
        }
      }
    };
    const newNode = { left: null, right: null, data: value };
    if (this.rootTree.data && this.rootTree.data > value) {
      insertNode(this.rootTree, value);
    }
  }

  inOrder() {
    const array = [];
    const repeat = (node) => {
      if (!node) {
        return;
      }
      repeat(node.left);
      array.push(node.data);
      repeat(node.right);
    };
    repeat(this.rootTree);
    return array;
  }

  preOrder() {
    const array = [];
    const repeat = (node) => {
      if (!node) {
        return;
      }
      array.push(node.data);
      repeat(node.left);
      repeat(node.right);
    };
    repeat(this.rootTree);
    return array;
  }

  postOrder() {
    const array = [];
    const repeat = (node) => {
      if (!node) {
        return;
      }
      repeat(node.left);
      repeat(node.right);
      array.push(node.data);
    };
    repeat(this.rootTree);
    return array;
  }

  getMin(node) {
    if (!node.left) {
      return node;
    } else {
      return this.getMin(node.left);
    }
  }

  getMax(node) {
    if (!node.right) {
      return node;
    } else {
      return this.getMax(node.right);
    }
  }

  search(value) {
    if (value) {
      const findValue = (node) => {
        if (value < node.data) {
          return findValue(node.left);
        } else if (value > node.data) {
          return findValue(node.right);
        } else {
          return node.data;
        }
      };
      return findValue(this.rootTree);
    }
  }

  delete(node, value: number) {
    if (node.data === value) {
      if (!node.left && !node.right) {
        node = null;
      } else if (!node.left || !node.right) {
        node = node.left || node.right
      } else {
        const getMinNode = (node, value) => {
          if (!node.left) {
            return node;
          } else {
            return getMinNode(node.left, value);
          }
        };
        let minNode = getMinNode(node.right, value);
        node.data = minNode.data;
        minNode = null;
      }
    }
  }
  // 插入
  // insert(value: number) {
  //   if (!this.rootTree.data) {
  //     console.log('请先初始化二叉树');
  //     return;
  //   }
  //   const newNode = { left: null, right: null, data: value };
  //   const insertNode = (node: { left: any, right: any, data: number }, value: number) => {
  //     // 叶子节点
  //     if (!node) {
  //       return newNode;
  //     }
  //     if (value > node.data) {
  //       if (!node.right) {
  //         node.right = newNode;
  //       } else {
  //         insertNode(node.right, value);
  //       }
  //     } else if (value < node.data) {
  //       if (!node.left) {
  //         node.left = newNode;
  //       } else {
  //         insertNode(node.left, value);
  //       }
  //     }
  //   };
  //   insertNode(this.rootTree, value);
  // }

  // // 中序遍历
  // inOrder(): number[] {
  //   const array = [];
  //   if (!this.rootTree.data) {
  //     console.log('请先初始化二叉树');
  //     return;
  //   }
  //   const repeat = (node) => {
  //     if (!node) {
  //       return;
  //     }
  //     repeat(node.left);
  //     array.push(node.data);
  //     repeat(node.right);
  //   };
  //   repeat(this.rootTree);
  //   return array;
  // }

  // // 前序遍历
  // preOrder(): number[] {
  //   if (!this.rootTree.data) {
  //     console.log('请先初始化二叉树');
  //     return;
  //   }
  //   const array = [];
  //   const repeat = (node) => {
  //     if (!node) {
  //       return;
  //     }
  //     array.push(node.data);
  //     repeat(node.left);
  //     repeat(node.right);
  //   };
  //   repeat(this.rootTree);
  //   return array;
  // }

  // // 后序遍历
  // postOrder(): number[] {
  //   if (!this.rootTree.data) {
  //     console.log('请先初始化二叉树');
  //     return;
  //   }
  //   const array = [];
  //   const repeat = (node) => {
  //     if (!node) {
  //       return;
  //     }
  //     repeat(node.left);
  //     repeat(node.right);
  //     array.push(node.data);
  //   };
  //   repeat(this.rootTree);
  //   return array;
  // }

  // // 取最小值
  // getMin(node) {
  //   if (!this.rootTree.data) {
  //     console.log('请先初始化二叉树');
  //     return;
  //   }
  //   if (node.left) {
  //     return this.getMin(node.left);
  //   } else {
  //     return node;
  //   }
  // }

  // // 取最大值
  // getMax(node) {
  //   if (!this.rootTree.data) {
  //     console.log('请先初始化二叉树');
  //     return;
  //   }
  //   if (node.right) {
  //     return this.getMax(node.right);
  //   } else {
  //     return node;
  //   }
  // }

  // // 根据值查找对应节点
  // search(node, value: number): { left: any; right: any; data: number; } {
  //   if (!node) {
  //     return;
  //   }
  //   if (node.data === value) {
  //     return node;
  //   } else if (node.data > value) {
  //     return this.search(node.left, value);
  //   } else if (node.data < value) {
  //     return this.search(node.right, value);
  //   }
  // }

  // 删除节点
  // delete(node, value: number) {
  //   if (!node) {
  //     return;
  //   }
  //   if (node.data === value) {
  //     // 若为叶子节点，直接清空
  //     if (!node.left && !node.right) {
  //       node = null;
  //     } else if (node.left && node.right) {
  //       let rightMin = this.getMin(node.right);
  //       node.data = rightMin.data;
  //       rightMin = null;
  //     } else {
  //       node = node.left || node.right;
  //     }
  //   } else if (node.data > value) {
  //     return this.delete(node.left, value);
  //   } else if (node.data < value) {
  //     return this.delete(node.right, value);
  //   }
  // }
}
