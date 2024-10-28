// 引入要测试的类
import { LinkList, ListNode } from "../src"; // 假设你的链表和节点类在这个文件中

import { describe, expect, it, vi } from "vitest";

describe("链表测试", () => {
  it("应正确追加项目", () => {
    const list = new LinkList<number>();
    list.append(1);
    list.append(2);
    list.append(3);

    let currentNode = list["head"]; // 假设head是公开的或通过某种方式可以访问
    let values = [];
    while (currentNode) {
      values.push(currentNode.value);
      currentNode = currentNode.next;
    }

    expect(values).toEqual([1, 2, 3]);
  });

  it("应正确移除项目", () => {
    const list = new LinkList<number>();
    list.append(1);
    list.append(2);
    list.append(3);
    list.remove(2); // 尝试删除中间的元素

    let currentNode = list["head"];
    let values = [];
    while (currentNode) {
      values.push(currentNode.value);
      currentNode = currentNode.next;
    }

    expect(values).toEqual([1, 3]);
  });

  it("应优雅处理删除不存在的项目", () => {
    const list = new LinkList<number>();
    list.append(1);
    list.append(2);
    list.append(3);
    list.remove(4); // 尝试删除不存在的元素

    let currentNode = list["head"];
    let values = [];
    while (currentNode) {
      values.push(currentNode.value);
      currentNode = currentNode.next;
    }

    expect(values).toEqual([1, 2, 3]);
  });

  it("应优雅处理在空链表中删除项目", () => {
    const list = new LinkList<number>();
    list.remove(1); // 尝试在空链表中删除元素

    expect(list["head"]).toBeNull();
  });
});


describe("链表打印测试", () => {
  it("应正确打印链表内容", () => {
    const list = new LinkList<number>();
    list.append(1);
    list.append(2);
    list.append(3);

    const result = list.print();
    expect(result).toBe("1 -> 2 -> 3 -> null");
  });

  it("应允许自定义打印格式", () => {
    const list = new LinkList<number>();
    list.append(1);
    list.append(2);
    list.append(3);

    const customPrint = (node: ListNode<number>) => `[${node.value}]`;
    const result = list.print(customPrint);
    expect(result).toBe("[1] -> [2] -> [3] -> null");
  });
});


describe("链表toArray功能测试", () => {
  it("toArray 方法应正确转换链表到数组", () => {
    const list = new LinkList<number>();
    list.append(1);
    list.append(2);
    list.append(3);

    // 直接使用节点的值进行转换
    const result = list.toArray(node => node.value);
    expect(result).toEqual([1, 2, 3]);
  });

  it("toArray 方法应允许通过传入函数控制转换内容，包括节点的更复杂处理", () => {
    const list = new LinkList<number>();
    list.append(1);
    list.append(2);
    list.append(3);

    // 使用 transformItem 函数包装每个节点的值到一个对象中
    const result = list.toArray<{ value: number, isEven: boolean }>(node => ({
      value: node.value,
      isEven: node.value % 2 === 0
    }));

    expect(result).toEqual([
      { value: 1, isEven: false },
      { value: 2, isEven: true },
      { value: 3, isEven: false }
    ]);
  });

  it("toArray 方法在不传递转换函数时，默认返回节点值的数组", () => {
    const list = new LinkList<number>();
    list.append(1);
    list.append(2);
    list.append(3);

    // 不使用任何转换函数，期望得到节点值的数组
    const result = list.toArray();
    expect(result).toEqual([1, 2, 3]);
  });
});


describe("链表forEach方法测试", () => {
  it("应该能够遍历链表并修改满足条件的节点数据", () => {
    const list = new LinkList<number>();
    list.append(1);
    list.append(2);
    list.append(3);
    list.append(4);

    // 使用 forEach 方法将所有大于2的节点值加倍
    list.forEach((node) => {
      if (node.value > 2) {
        node.value *= 2;
      }
    });

    // 预期链表的toArray方法输出加倍后的值
    const result = list.toArray(node => node.value);
    expect(result).toEqual([1, 2, 6, 8]);
  });

  it("forEach 应正确处理空链表", () => {
    const list = new LinkList<number>();
    const mockCallback = vi.fn();

    // 在空链表上调用 forEach
    list.forEach(mockCallback);

    // 预期回调函数没有被调用
    expect(mockCallback).not.toHaveBeenCalled();
  });
});




it('insert 方法能正确地在链表中插入节点', () => {
  const list = new LinkList<number>();
  list.insert(0, 1); // 在头部插入
  list.insert(1, 3); // 在尾部插入
  list.insert(1, 2); // 在中间插入

  const array = list.toArray(node => node.value);
  expect(array).toEqual([1, 2, 3]);
});

it('findIndex 方法能根据条件找到正确的节点索引', () => {
  const list = new LinkList<number>();
  list.append(1);
  list.append(2);
  list.append(3);

  const index = list.findIndex(value => value === 2);
  expect(index).toBe(1);

  const notFoundIndex = list.findIndex(value => value === 4);
  expect(notFoundIndex).toBe(-1);
});

it('insert 方法应正确处理超出当前长度的索引', () => {
  const list = new LinkList<number>();
  list.insert(100, 1); // 插入到空链表，应该直接成为头节点

  const array = list.toArray(node => node.value);
  expect(array).toEqual([1]);
});

it('findIndex 方法在空链表上应返回-1', () => {
  const list = new LinkList<number>();
  const index = list.findIndex(value => value === 1);
  expect(index).toBe(-1);
});
