/*
 * @Author: 邱狮杰&qwm
 * @Date: 2023-08-05 10:24:08
 * @LastEditTime: 2023-08-05 10:48:26
 * @Description: 
 * @FilePath: /memo/packages/serviceHelper/src/sliceRequest/header.ts
 */
import { CONSTANT, injection } from './constant'
import { assemblyRequest } from './method'


/**
 * 
 * 
 * 请求头装饰器
 * 
 * @public
 */
export function Header(obj?: object) {
    return (target: object, key: string, descriptor: PropertyDescriptor) => {
        injection.setTarget(target).setValue(CONSTANT.HEADERS, obj)
        return assemblyRequest(target, key, descriptor)
    }
}