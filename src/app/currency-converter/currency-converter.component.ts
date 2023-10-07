import {Component,OnInit} from '@angular/core';
import {CurrencyService} from "../services/currency.service";

@Component({
    selector: 'app-currency-converter',
    templateUrl: './currency-converter.component.html',
    styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent implements OnInit{

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
            this.setRightAmount();
            this.setCrossRates();
        })
    }

    setRightAmount() {
        this.rightAmount = this.currencyService.convert(this.leftCurrency, this.leftAmount, this.rightCurrency);
    }

    setLeftAmount() {
        this.leftAmount = this.currencyService.convert(this.rightCurrency, this.rightAmount, this.leftCurrency);
    }

    setCrossRates() {
        this.setLeftCrossRate();
        this.setRightCrossRate();
    }

    setLeftCrossRate() {
        this.leftCrossRate = this.currencyService.convert(this.leftCurrency,1, this.rightCurrency);
    }

    setRightCrossRate() {
        this.rightCrossRate = this.currencyService.convert(this.rightCurrency,1, this.leftCurrency);
    }

}
