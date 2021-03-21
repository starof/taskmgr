import { Action } from "@ngrx/store";

//定义几个action常量
export const QUOTE = 'QUOTE';
export const QUOTE_SUCCESS = 'QUOTE_SUCCESS';
export const QUOTE_FAIL = 'QUOTE_FAIL';


export class Quote implements Action {
    readonly type: string = QUOTE;
    payload: any;

}

export class QuoteFail implements Action {
    readonly type: string = QUOTE_FAIL;

}
export class QuoteSuccess implements Action {
    readonly type: string = QUOTE_SUCCESS;
    payload: any;

}

export type QuoteAction = Quote | QuoteSuccess | QuoteFail;