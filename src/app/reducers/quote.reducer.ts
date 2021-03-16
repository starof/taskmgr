import { Quote } from '../domain/quote.model';
import * as quoteAction from '../actions/quote.actions';

export interface State {
    quote: Quote
};

export const initialState: State = {
    quote: { cn: '满足感在于不断的努力，而不是现有成就。全心努力定会胜利满满。', pic: '/assets/images/quote_fallback.jpg', en: 'Satisfaction lies in the effort, not in the attainment. Full effort is full victory.' },
};


export function reducer(state = initialState, action: { type: string, payload: any }): State {
    switch (action.type) {
        case quoteAction.QUOTE_SUCCESS: {
            return {
                ...state, quote: action.payload
            };
        }
        case quoteAction.QUOTE_FAIL:
        default: {
            return state;
        }
    }
}

export const getQuote = (state: State) => state.quote