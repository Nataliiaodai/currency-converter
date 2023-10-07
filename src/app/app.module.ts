import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { HeaderComponent } from './header/header.component';
import { CurrencyWidgetComponent } from './currency-widget/currency-widget.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyConverterComponent,
    HeaderComponent,
    CurrencyWidgetComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
