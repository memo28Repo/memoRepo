/*
 * @Author: 邱狮杰
 * @Date: 2023-05-12 23:08:08
 * @LastEditTime: 2023-05-12 23:32:30
 * @Description: 增强ref
 * @FilePath: /memo/packages/vue/src/hooks/useEnhancedRef.ts
 */
import { Ref, ref, toRaw, UnwrapRef } from "vue";
import { mergeFnWithPromiseFn } from "@memo28/types";

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
export function useEnhancedRef<T extends object>(val: Partial<T>): [Ref<UnwrapRef<Partial<T>>>, (val?: Partial<UnwrapRef<T>>) => void, mergeFnWithPromiseFn<void, []>] {
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

    return [state, updateState, resetState]
}

const [state, updateState, resetState] = useEnhancedRef({ age: 1, name: 1 })

