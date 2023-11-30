/*
 * @Author: @memo28.repo
 * @Date: 2023-11-29 15:26:14
 * @LastEditTime: 2023-11-29 15:32:40
 * @Description: 
 * @FilePath: /memo/uniapp/utils/src/state/env.ts
 */
import { computed } from 'vue';


/**
 * 
 * 判断是否在 h5 环境中 h5
 * 
 * @public
 */
export const isH5Computed = computed(() => {
    // #ifdef H5
    return true
    // #endif
    return false
})
/**
 * 
 * 判断是否在 app 环境中
 * 
 * @public
 */
export const isAppComputed = computed(() => {
    // #ifdef APP-PLUS
  return true
  // #endif
    return false
})
/**
 * 
 * 判断是否在 wechat 环境中
 * 
 * @public
 */
export const isWechatComputed = computed(() => {
    // #ifdef MP-WEIXIN
    return true
  // #endif
    return false
})



