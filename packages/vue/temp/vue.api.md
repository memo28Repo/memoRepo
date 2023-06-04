## API Report File for "@memo28/vue"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { mergeFnWithPromiseFn } from '@memo28/types';
import { Ref } from 'vue';
import { UnwrapRef } from 'vue';

// @public
export function useEnhancedRef<T extends object>(val: Partial<T>): {
    state: Ref<UnwrapRef<Partial<T>>> & UnwrapRef<Partial<T>>;
    updateState: mergeFnWithPromiseFn<void, [Partial<UnwrapRef<T>>]>;
    resetState: mergeFnWithPromiseFn<void, []>;
};

```