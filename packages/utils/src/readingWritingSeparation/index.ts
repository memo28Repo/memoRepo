
/*
 * @Author: 邱狮杰&qwm
 * @Date: 2023-08-23 18:49:30
 * @LastEditTime: 2023-09-21 14:46:33
 * @Description: 
 * @FilePath: /memo/packages/utils/src/readingWritingSeparation/index.ts
 */

/**
 *
 * 读写分离工具类型
 * 将传入的对象类型转为 `get set` 类型
 *
 * @remarks
 * ```
 * {
 *   getName:() => string
 *   setName:(name: string) => void
 * }
 *
 * type S = readingWritingSeparationUtilsType<{ name: string }>
 *
 * ```
 *
 *
 * @public
 */
export type readingWritingSeparationUtilsType<T extends object> = {
  [K in keyof Required<T> as `get${Capitalize<string & K>}`]: () => Required<T>[K];
} & {
    [K in keyof Required<T> as `set${Capitalize<string & K>}`]: (value: Required<T>[K]) => void;
  };

/**
 * 首字母大写
 * 
 * @public
 */
function capitalizeFirstLetter(name: string) {
  return name.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}

/**
 * 
 * 读写分离属性装饰器
 * 
 * @public
 * 
 */
export function readingWritingSeparationDetor(target: object, key: string) {
  const fmtName = capitalizeFirstLetter(key)


  Reflect.defineProperty(target, `get${fmtName}`, {
    value() {
      return Reflect.get(this, key)
    }
  })

  Reflect.defineProperty(target, `set${fmtName}`, {
    value(val: unknown) {
      Reflect.set(this, key, val)
    }
  })

}