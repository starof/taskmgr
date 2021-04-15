import { LOAD_FAIL } from './../actions/quote.actions';
import { Quote } from './../domain/quote.model';
import { QuoteService } from './../services/quote.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from '../actions/quote.actions';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class QuoteEffects {
    constructor(private actions$: Actions, private quoteService: QuoteService) { }

    // actionName$ = this.actions$.pipe(ofType(class.actionName));
    quote$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(actions.LOAD),
            switchMap(_ => {
                return this.quoteService.getQuote().pipe(
                    map(quote => new actions.LoadSuccess(quote)),
                    catchError(error => of({ type: actions.LOAD_FAIL, payload: JSON.stringify(error) }))
                )
            })
        )
    });
}