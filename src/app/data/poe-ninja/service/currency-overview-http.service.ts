import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { CurrencyOverviewResponse } from '../schema/currency-overview';

@Injectable({
    providedIn: 'root'
})
export class CurrencyOverviewHttpService {
    private readonly apiUrl: string;

    constructor(private readonly httpClient: HttpClient) {
        this.apiUrl = `${environment.poeNinja.baseUrl}/data/currencyoverview`;
    }

    public get(leagueId: string): Observable<CurrencyOverviewResponse> {
        const params = new HttpParams({
            fromObject: {
                league: leagueId,
                type: 'Currency'
            }
        });
        return this.httpClient.get<CurrencyOverviewResponse>(this.apiUrl, {
            params
        }).pipe(
            retry(3)
        );
    }
}
