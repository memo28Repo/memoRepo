import { ListNode, ListNodeEscapePod } from "./listNode";

/**
 *
 *
 * 业务链表
 *
 */
export class LinkList<T> {
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;

  /**
   * 根据条件查找节点的索引
   *
   * @param predicate 一个函数，接受节点值作为参数，返回一个布尔值
   * @returns 满足条件的第一个节点的索引，如果没有找到则返回-1
   *
   * @public
   */
  findIndex(predicate: (value: T) => boolean): number {
    let current = this.head;
    let index = 0;
    while (current !== null) {
      if (predicate(current.value)) {
        return index;
      }
      current = current.next;
      index++;
    }
    return -1; // 没有找到满足条件的节点
  }

  /**
   * 在链表的指定位置插入一个新节点
   * @param index 插入位置的索引（从 0 开始）。如果索引大于链表长度，则插入到链表末尾。
   * @param value 新节点的值
   *
   * @public
   */
  insert(index: number, value: T): void {
    const newNode = new ListNode(value);

    if (index <= 0 || this.head === null) {
      // 插入到链表头部
      newNode.next = this.head;
      this.head = newNode;
      if (this.tail === null) {
        // 如果链表为空，则同时更新尾节点
        this.tail = newNode;
      }
    } else {
      // 寻找正确的插入位置
      let current = this.head;
      let currentIndex = 0;

      while (current.next !== null && currentIndex < index - 1) {
        current = current.next;
        currentIndex++;
      }

      // 插入新节点
      newNode.next = current.next;
      current.next = newNode;

      if (newNode.next === null) {
        // 如果新节点是最后一个节点，则更新尾节点
        this.tail = newNode;
      }
    }
  }


  /**
   * 遍历链表，允许在满足特定条件时修改节点数据
   *
   * @param callback 回调函数，允许用户基于条件修改节点
   *
   * @public
   */
  forEach(callback: (node: ListNode<T>, index: number) => void): void {
    let current = this.head;
    let index = 0;
    while (current !== null) {
      callback(current, index);
      current = current.next;
      index += 1;
    }
  }


  /**
   * 添加节点到链表尾部
   *
   * @public
   *
   */
  append(value: T): void {
    const newNode = new ListNode(value, this);
    if (!this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.updateEscapePod(this.tail, null);
      this.tail = newNode;
    }
  }

  /**
   * 删除链表中的节点
   *
   * @public
   */
  remove(value: T): void {
    if (!this.head) return;

    let current: ListNode<T> | null = this.head;
    let prev = null;

    while (current) {
      if (current.value === value) {
        if (prev) {
          prev.next = current.next;
          prev.updateEscapePod(prev.escapePod?.prev, current.next);
        } else {
          this.head = current.next;
        }

        if (current.next) {
          current.next.updateEscapePod(prev, current.next.next);
        } else {
          this.tail = prev;
        }

        current.updateEscapePod(null, null);
        return;
      }
      prev = current;
      current = current.next;
    }
  }

  /**
   * 将链表转换为数组
   * @param transformItem 可选的转换函数，允许对链表中的每个元素进行自定义处理
   * @returns 转换后的数组
   *
   * @public
   */
  toArray<A>(transformItem?: (node: ListNode<T>) => A): A[] {
    let current = this.head;
    const result: any[] = [];
    while (current) {
      // 如果提供了转换函数，则使用该函数处理节点值
      const item = transformItem ? transformItem(current) : current.value;
      result.push(item);
      current = current.next;
    }
    return result;
  }


  /**
   * 打印链表
   *
   * 返回链表打印结构
   *
   *
   * @public
   */
  print(parintItem?: (node: ListNode<T>) => string): string {
    let current = this.head;
    let result = "";
    while (current) {
      result += `${parintItem ? parintItem(current) : current.value} -> `;
      current = current.next;
    }
    result = result + "null";
    return result;
  }
}
