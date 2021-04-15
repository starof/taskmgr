import { QuoteEffects } from './quote.effects';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';


@NgModule({
    imports: [EffectsModule.forRoot([QuoteEffects])],
})
export class AppEffectsModule { }