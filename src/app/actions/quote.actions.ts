import { Quote } from './../domain/quote.model';
import { Action } from "@ngrx/store";

//定义几个action常量
export const LOAD = 'LOAD';
export const LOAD_SUCCESS = 'LOAD_SUCCESS';
export const LOAD_FAIL = 'LOAD_FAIL';


export class Load implements Action {
    readonly type: string = LOAD;
    payload: any;


}

export class LoadFail implements Action {
    readonly type: string = LOAD_FAIL;

}
export class LoadSuccess implements Action {
    readonly type: string = LOAD_SUCCESS;
    payload: any;
    constructor(payload: any) { this.payload = payload }

}

export type QuoteAction = Load | LoadSuccess | LoadFail;
