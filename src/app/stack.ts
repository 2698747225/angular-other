/**
 * @params * push(element(s))：添加一个（或几个）新元素到栈顶；
  * pop()：移除栈顶的元素，同时返回被移除的元素；
  * peek()：返回栈顶的元素，不对栈做任何修改；
  * isEmpty()：如果栈里没有任何元素就返回true，否则返回false；
  * clear()：移除栈里的所有元素；
  * size()：返回栈里的元素个数。
 */
export class Stack {
  list = [];

  // 入栈
  push(element: any) {
    this.list.push(element);
  }

  // 出栈
  pop() {
    this.list.pop();
  }

  // 返回栈顶元素
  peek() {
    return this.list[this.list.length - 1];
  }

  // 判断是否空栈
  isEmpty() {
    return this.list.length === 0;
  }

  // 清空栈
  clear() {
    this.list = [];
  }

  // 返回栈内元素个数
  size() {
    return this.list.length;
  }
}
