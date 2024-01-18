/**
 * 响应直接返回 `response.data`
 *
 * @public
 */
export class RetData {
    constructor() {
        this.displayName = 'Ret';
    }
    responseSuc(value) {
        return value.data;
    }
}
