import { createSelector } from 'reselect';

import { NgModule } from '@angular/core';
import { ActionReducer, ActionReducerMap, combineReducers, compose, StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import * as fromQuote from './quote.reducer';

import { environment } from 'src/environments/environment';

//全局state
export interface State {
    quote: fromQuote.State //分支的state
};

const initialState: State = {
    quote: fromQuote.initialState
};

export const getQuoteState = (state: State) => state.quote;

//createSelector() 创建选择器，帮我们把任意的两个函数组合到一起，并且有记忆，有缓存
export const getQuote = createSelector(getQuoteState, fromQuote.getQuote);

@NgModule({
    imports: [
        StoreModule.forRoot({ quote: fromQuote.reducer }), //全局reducer
        StoreRouterConnectingModule.forRoot(),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }) //给devtools提供钩子
    ]
})
export class AppStoreModule { }