import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {CurrencyModel} from "../currency-converter/currency.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class CurrencyService {

    constructor(private http: HttpClient) {
    }

    getAllCurrency(): Observable<CurrencyModel[]> {
        return this.http.get<CurrencyModel[]>('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
    }

}
