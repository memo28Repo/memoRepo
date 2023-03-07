/*
 * @Author: 邱狮杰
 * @Date: 2023-03-07 09:26:12
 * @LastEditTime: 2023-03-07 09:26:14
 * @Description:
 * @FilePath: /memo/packages/utils/src/errors/test.ts
 */

function MethodInterceptor(params: string) {
  return function (targetClassPrototype: any, name: string, decr: PropertyDescriptor) {
    let temp = decr.value
    decr.value = function (...args: any) {
      // 前置拦截
      console.log('选择物品')
      temp.call(this, args)
      // 后置拦截
      console.log('吃掉')
    }
  }
}

class CustomerServeice {
  name: string
  constructor(name: string) {
    this.name = name
  }

  @MethodInterceptor('6666')
  buy() {
    console.log(`${this.name}购买`)
  }

  pay() {
    console.log(`${this.name}付款`)
  }
}

let c1 = new CustomerServeice('张三')

// 选择物品
// 张三购买
// 吃掉
c1.buy()
