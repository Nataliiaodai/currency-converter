import {Injectable, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {CurrencyModel} from "../currency-converter/currency.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class CurrencyService {

    allCurrency: CurrencyModel[] = [];
    currencyRefreshed: Subject<void> = new Subject<void>();

    constructor(private http: HttpClient) {
        this.getAllCurrency().subscribe((response) => {
            this.allCurrency = response;
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

    currencyConverting(
        fromCurrency: string,
        fromAmount: number,
        toCurrency: string) {

        let sourceCurrencyInUah: number = 0;
        let targetCurrencyRate: number = 0 ;

        for(let item of this.allCurrency) {
            if (item.cc === fromCurrency) {
                sourceCurrencyInUah = fromAmount * item.rate;
                console.log('sourceCurrencyToUah--', sourceCurrencyInUah);
            }

            if(item.cc === toCurrency ) {
                targetCurrencyRate = item.rate;
                console.log('currencyToPerOne', targetCurrencyRate);
            }
        }

        return Math.round(sourceCurrencyInUah / targetCurrencyRate * 100) / 100;
    }




    getAllCurrency(): Observable<CurrencyModel[]> {
        return this.http.get<CurrencyModel[]>('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
    }

}

