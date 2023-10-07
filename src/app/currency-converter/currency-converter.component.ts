import {Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges,} from '@angular/core';
import {CurrencyService} from "../services/currency.service";
import {CurrencyModel} from "./currency.model";

@Component({
    selector: 'app-currency-converter',
    templateUrl: './currency-converter.component.html',
    styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent implements OnInit, DoCheck {

    constructor(public currencyService: CurrencyService) {
    }

    allCurrency: CurrencyModel[] = [];
    selectedFromCurrency: string = 'UAH';
    selectedToCurrency: string = 'USD';
    selectedFromAmount: number = 100;
    selectedToAmount: number = 100;


    ngOnInit() {
        this.onGettingAllCurrency();
        console.log('OnInit--selectedFromCurrency---', this.selectedFromCurrency);
        console.log('OnInit--selectedToCurrency---', this.selectedToCurrency);
        // console.log('OnInit--selectedFromAmount---', this.selectedFromAmount);
        // console.log('OnInit--selectedToAmount---', this.selectedToAmount);

    }

    onGettingAllCurrency() {
        this.currencyService.getAllCurrency().subscribe((response) => {
            this.allCurrency = response;
            console.log(response);
        });
    }

    ngDoCheck() {
        console.log('DoCheck--selectedFromCurrency---', this.selectedFromCurrency);
        console.log('DoCheck--selectedToCurrency---', this.selectedToCurrency);
    }

    // singleCurrencyCompare() {
    //
    // }

}
