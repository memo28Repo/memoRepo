import { AnomalousChain, ErrorsNewResult } from '@memo28/utils';
export declare class ErrorWithAxios extends AnomalousChain {
    protected obj: object;
    private notAxiosError;
    constructor(obj: object);
    protected skip(errors: ErrorsNewResult | null): this;
    AxiosError(): this;
    getNotAxiosError(): boolean;
}
