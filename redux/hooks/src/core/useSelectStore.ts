/*
 * @Author: 邱狮杰&qwm
 * @Date: 2023-11-09 13:49:05
 * @LastEditTime: 2024-01-05 20:08:53
 * @Description: 
 * @FilePath: /memo/redux/hooks/src/core/useSelectStore.ts
 */
import { createSliceImpl } from "@memo28/enhance-redux";
import { enhanceCreateActionPayload } from "@memo28/enhance-redux/src/core/createActionImpl";
import { ObjectKeyPaths } from "@memo28/types";
import { isEmpty } from "@memo28/utils";
import get from "lodash.get";
import { useDispatch, useSelector, useStore } from "react-redux";

/**
 * 使用useSelectStore hook来操作store
 * 
 * 
 * @remarks
 *  返回一个对象，包含`empty`, `store`, `storeWithRoot`和`dispatch`四个方法
 * 
 * @param slice - {@link createSliceImpl} 的实例
 * 
 * 
 * @public
 * 
 */
export function useSelectStore<Slice extends createSliceImpl>(slice: Slice) {
  const storeRoot = useStore<state>();

  const dis = useDispatch();


  
  /**
   * 调用dispatch方法来dispatch action
   * 
   * @param dispatchContext - 包含payload和type的对象，可选
   * 
   * @public
   */
  function dispatch(dispatchContext?: {
    payload: enhanceCreateActionPayload,
    type: string
  }) {
    if (!dispatchContext) return;
    dis(dispatchContext);
  }

  /**
   *
   * 获取 `store` 中更新后最实时的值  而不是 `react` 更新后的 `store` 的值
   *
   * @public
   *
   */
  function storeWithRoot(): state {
    // @ts-ignore
    return storeRoot.getState()[slice.getSliceName() as stateName];
  }

  /**
   *
   * `reducer name`
   *
   * @public
   *
   */
  type stateName = ReturnType<Slice["getSliceName"]>


  /**
   *
   * `store value`
   *
   * @public
   */
  type state = ReturnType<Slice["getState"]>


  /**
   *
   *
   * `redux store` 中 key 等于 `reducerName` 的 值
   *
   * @public
   *
   */
  const store = <state>useSelector((state: { [key in stateName]: any }) => {
    return state[slice.getSliceName() as stateName];
  });


  /**
   *
   * 判断`store`中的某个值是否为空
   *
   * @param state - `store` 的 `key`
   *
   * @public
   */
  function empty(state: ObjectKeyPaths<state>) {
    return isEmpty(get(store, state));
  }

  return { empty, store, storeWithRoot, dispatch };

}
