/*
 * @Author: 邱狮杰
 * @Date: 2023-03-23 17:59:22
 * @LastEditTime: 2023-03-24 13:46:36
 * @Description:
 * @FilePath: /memo/packages/service/src/core/version.ts
 */
// @ts-ignore
import pack from '../../package.json'

export function versionLog() {
  console.log(
    `%c @memo28/service %c Detected v${pack.version} %c`,
    'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
    'background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
    'background:transparent'
  )
}
