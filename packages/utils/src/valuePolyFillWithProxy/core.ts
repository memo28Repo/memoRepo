/*
 * @Author: 邱狮杰
 * @Date: 2023-05-21 09:29:02
 * @LastEditTime: 2023-05-21 09:35:31
 * @Description:
 * @FilePath: /memo/packages/utils/src/valuePolyFillWithProxy/core.ts
 */

// const a = {
//     value: 1
// }
// const b = new Proxy(a, {
//     construct(target, argArray, newTarget) {
//         return target
//     },
//     get(target, value, receiver) {
//         const el = target[value as keyof typeof target]
//         console.log(
//             el
//         )
//         return el
//     }

// })

// console.log(b.value)