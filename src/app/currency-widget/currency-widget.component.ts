import {Component, OnInit} from '@angular/core';
import {CurrencyService} from "../services/currency.service";
import {getMathRound} from "../helpers/round-to-two-decimal-places.function"

@Component({
    selector: 'app-currency-widget',
    templateUrl: './currency-widget.component.html',
    styleUrls: ['./currency-widget.component.css']
})
export class CurrencyWidgetComponent implements OnInit {

    usdToUahRate: number = 0;
    euroToUahRate: number = 0;

    constructor(private currencyService: CurrencyService) {
    }

    ngOnInit() {
        this.currencyService.currencyRefreshed.subscribe(() => {
            this.usdToUahRate = getMathRound(this.currencyService.getUahRate('USD'));
            this.euroToUahRate = getMathRound(this.currencyService.getUahRate('EUR'));
        })

    }


}
