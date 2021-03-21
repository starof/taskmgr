import { Quote } from '../domain/quote.model';
import * as quoteAction from '../actions/quote.actions';
import { Action } from '@ngrx/store';


export interface State {
    quote: Quote
};

export const initialState: State = {
    quote: { cn: '满足感在于不断的努力，而不是现有成就。全心努力定会胜利满满。', pic: '/assets/images/quote_fallback.jpg', en: 'Satisfaction lies in the effort, not in the attainment. Full effort is full victory.' },
};


export function reducer(state = initialState, action: quoteAction.QuoteAction): State {
    switch (action.type) {
        case quoteAction.LOAD_SUCCESS: {
            return {
                ...state, quote: (action as quoteAction.LoadSuccess).payload
            };
        }
        case quoteAction.LOAD_FAIL:
        default: {
            return state;
        }
    }
}

//写一个selector,接受state参数，返回state里面的quote
export const getQuote = (state: State) => state.quote