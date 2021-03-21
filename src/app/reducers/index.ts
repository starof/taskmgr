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

@NgModule({
    imports: [
        StoreModule.forRoot({ quote: fromQuote.reducer }), //全局reducer
        StoreRouterConnectingModule.forRoot(),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }) //给devtools提供钩子
    ]
})
export class AppStoreModule { }