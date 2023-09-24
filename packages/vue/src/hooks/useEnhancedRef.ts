/*
 * @Author: 邱狮杰
 * @Date: 2023-05-12 23:08:08
 * @LastEditTime: 2023-05-13 11:11:02
 * @Description: 增强ref
 * @FilePath: /memo/packages/vue/src/hooks/useEnhancedRef.ts
 */
import { mergeFnWithPromiseFn } from "@memo28/types";
import { Ref, ref, toRaw, UnwrapRef } from "vue";

/**
 *
 * 增强 ref
 *
 * @example
 * ```ts
 * state.value.age // 1
 *
 * updateState({
 *     age: 10
 * })
 *
 *
 * state.value.age // 10
 *
 * resetState()
 *
 *
 * state.value.age // 1
 * ```
 *
 * @public
 *
 */
export function useEnhancedRef<T extends object>(val: Partial<T>): {
    state: Ref<UnwrapRef<Partial<T>>> & UnwrapRef<Partial<T>>;
    updateState: mergeFnWithPromiseFn<void, [Partial<UnwrapRef<T>>]>;
    resetState: mergeFnWithPromiseFn<void, []>;
} {
    const backVal = backupState()
    const state = ref<Partial<T>>(val)

    function updateState(val?: Partial<UnwrapRef<T>>): void {
        state.value = {
            ...getState() as object,
            ...val as UnwrapRef<Ref>
        }
    }

    function resetState() {
        state.value = backVal
    }

    function getState() {
        return toRaw(state.value)
    }

    function backupState(): UnwrapRef<Partial<T>> {
        const h = {
            ...val
        }
        return h as UnwrapRef<Partial<T>>
    }

    return {
        // @ts-ignore
        state,
        updateState,
        resetState
    }
}



