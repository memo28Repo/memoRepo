import { useDispatch, useSelector, TypedUseSelectorHook, useStore } from "react-redux";
import { createSliceImpl } from "@memo28/enhance-redux";
import { ObjectKeyPaths } from "@memo28/types";
import { isEmpty } from "@memo28/utils";
import get from "lodash.get";
import { enhanceCreateAction, enhanceCreateActionPayload } from "@memo28/enhance-redux/src/core/createActionImpl";

export function useSelectStore<Slice extends createSliceImpl>(slice: Slice) {
  const storeRoot = useStore<state>();

  const dis = useDispatch();

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
