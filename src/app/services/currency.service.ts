import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {CurrencyModel} from "../currency-converter/currency.model";
import {HttpClient} from "@angular/common/http";
import {getMathRound} from "../helpers/round-to-two-decimal-places.function"

@Injectable({
    providedIn: 'root'
})
export class CurrencyService {

    supportedCurrencies: string[] = ['USD', 'EUR', 'CAD', 'PLN', 'GBP'];
    allCurrency: CurrencyModel[] = [];
    currencyRefreshed: Subject<void> = new Subject<void>();

    constructor(private http: HttpClient) {
        this.getAllCurrency().subscribe((response) => {
            this.allCurrency = response.filter(item => this.supportedCurrencies.includes(item.cc))
            this.allCurrency.push({
                r030: 9643,
                txt: "Українська гривня",
                rate: 1,
                cc: "UAH",
                exchangedate: "09.10.2023"
            })
            this.currencyRefreshed.next();
            console.log(response);
        });
    }

    getModifiedCurrencyList() {
        let modifiedCurrencyList: string[] = [];
        for (let item of this.allCurrency) {
            modifiedCurrencyList.push(item.cc);
        }
        return modifiedCurrencyList;
    }

    convert(srcCurrency: string, srcAmount: number, targetCurrency: string) {
        const amountInUah = srcAmount * this.getUahRate(srcCurrency);
        const targetCurrencyRate = this.getUahRate(targetCurrency);
        let result: number = amountInUah / targetCurrencyRate;
        return getMathRound(result);
    }

    getUahRate(currency: string) {
        let currencyItemRate: number = 0;
        for (let item of this.allCurrency) {
            if (item.cc === currency) {
                currencyItemRate = item.rate;
            }
        }
        return  currencyItemRate;
    }

    // getMathRound(num: number) {
    //     return Math.round(num * 100) / 100;
    // }

    getAllCurrency(): Observable<CurrencyModel[]> {
        return this.http.get<CurrencyModel[]>('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
    }

}

