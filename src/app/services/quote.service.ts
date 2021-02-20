import { HttpClient } from '@angular/common/http';
import { Quote } from './../domain/quote.model';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class QuoteService {
    constructor(@Inject('BASE_CONFIG') private config: any, private http: HttpClient) { }

    getQuote(): Observable<Quote> {
        const uri = `${this.config.uri}/quotes/${Math.floor(Math.random() * 10)}`;
        return this.http.get(uri).pipe(map(quote => quote as Quote))
    }
}