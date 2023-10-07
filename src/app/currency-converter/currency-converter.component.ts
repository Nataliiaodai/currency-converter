import {Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges,} from '@angular/core';
import {CurrencyService} from "../services/currency.service";
import {CurrencyModel} from "./currency.model";

@Component({
    selector: 'app-currency-converter',
    templateUrl: './currency-converter.component.html',
    styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent implements OnInit, DoCheck {

    leftCurrency: string = 'USD';
    leftAmount: number = 1;
    rightCurrency: string = 'EUR';
    rightAmount: number = 1;

    leftCrossRate: number = 0;
    rightCrossRate: number = 0;


    constructor(public currencyService: CurrencyService) {
    }

    ngOnInit() {
        this.currencyService.currencyRefreshed.subscribe(() => {
            this.onConvertingLeftSide();
            this.onCurrencyChange();
        })
    }


    ngDoCheck() {
    }

    onConvertingLeftSide() {
        this.rightAmount = this.currencyService.currencyConverting(
            this.leftCurrency,
            this.leftAmount,
            this.rightCurrency);
    }

    onConvertingRightSide() {
        this.leftAmount = this.currencyService.currencyConverting(
            this.leftCurrency,
            this.leftAmount,
            this.rightCurrency);
    }

    onCurrencyChange() {
        this.setLeftCrossRate();
        this.setRightCrossRate();
    }

    setLeftCrossRate() {
        this.leftCrossRate = this.currencyService.currencyConverting(
            this.leftCurrency,
            1,
            this.rightCurrency);
    }


    setRightCrossRate() {
        this.rightCrossRate =  this.currencyService.currencyConverting(
            this.rightCurrency,
            1,
            this.leftCurrency);
    }

}
