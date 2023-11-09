import { fn } from "@memo28/types";
import { createAction, nanoid } from "@reduxjs/toolkit";
import { createActionImpl, createActionMapperType } from "./createActionImpl";

export class CreateAction<O extends createActionMapperType> implements createActionImpl<O> {

  /**
   *
   *
   * `actions` 集合
   *
   * @private
   */
  private createActionMapper: Partial<O> = {};


  /**
   *
   *
   * `actions` 迭代器
   *
   * @param callback - 遍历集合 传入 `action.type`
   *
   * @public
   */
  actionIterator(callback?: fn<[string], void>) {
    for (let actionMapperKey in this.createActionMapper) {
      callback?.(actionMapperKey);
    }
  }

  /**
   *
   * 新增 action 链式调用
   *
   *
   * @paramType  Obj - `payload` 对象
   *
   * @paramType  Type - `action.type`
   *
   * @public
   */
  addAction<Obj extends object, Type extends string>(type: Type): CreateAction<O & createActionMapperType<Type, Obj>> {
    Reflect.set(this.createActionMapper, type,
      createAction(type, function(params: Obj) {
        return {
          payload: {
            ...(params || {}),
            actionId: nanoid(),
            actionCreateAt: new Date().getTime()
          }
        };
      })
    );
    return this as unknown as CreateAction<createActionMapperType<Type, Obj> & O>;
  }

  /**
   *
   *
   *
   * 获取某一个 `action` 函数
   *
   *
   * ```ts
   *  const action = new CreateAction().add<{ age: string }>("type").getAction("type");
   *  action?.({ age: "12" })
   * ```
   *
   *
   * @param type
   */
  getAction<K extends keyof O>(type: K): Partial<O>[K] {
    return this.createActionMapper[type];
  }


  /**
   *
   * 获取所有 `actions` 集合
   *
   * @public
   *
   */
  getAllActions(): O {
    return this.createActionMapper as O;
  }

}





