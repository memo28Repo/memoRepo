import { LinkList } from "./linkList";

export type ListNodeEscapePod<T> = { prev: ListNode<T> | null | undefined; next: ListNode<T> | null | undefined } | null

/**
 * 链表节点
 */
export class ListNode<T> {
  value: T;
  next: ListNode<T> | null = null;

  /**
   * 逃生舱：用于保存节点的前后依赖关系
   *
   * @public
   */
  escapePod: ListNodeEscapePod<T> = null;

  /**
   * 指向链表的引用
   *
   * @public
   */
  listRef: LinkList<T> | null = null;


  constructor(value: T, list?: LinkList<T>) {
    this.value = value;
    if (list) this.listRef = list;
  }

  /**
   * 更新节点的逃生舱
   */
  updateEscapePod(prev: ListNode<T> | null | undefined, next: ListNode<T> | null | undefined): void {
    this.escapePod = { prev, next };
  }

}

