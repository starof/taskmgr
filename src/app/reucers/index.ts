import { NgModule } from '@angular/core';
import { ActionReducer, ActionReducerMap, combineReducers, compose, StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import * as fromQuote from './quote.reducer';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from 'src/environments/environment';

//全局state
export interface State {
    quote: fromQuote.State
};

const initialState: State = {
    quote: fromQuote.initialState
};
//构建reducers字典,包含所有分支reducer
const reducers = {
    quote: fromQuote.reducer
}

// const productionReducers: ActionReducer<State> = combineReducers(reducers);
const developmentReducers: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);

export function reducer(state = initialState, action: any): State {
    // return environment.production ? productionReducers(state, action) : developmentReducers(state, action);
    return developmentReducers(state, action);
}


@NgModule({
    imports: [
        StoreModule.forRoot({
            router: routerReducer,
        }),
        StoreModule.forRoot(reducer),
        StoreRouterConnectingModule.forRoot(),
        // StoreDevtoolsModule.instrumentOnlyWithExtension(),
        StoreDevtoolsModule.instrument() //给devtools提供钩子
    ]
})
export class AppStoreModule { }