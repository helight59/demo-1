import {MinorStrategy} from "./number-sum-rub.strategy";

export class NumberSum {
    value: string;
    strategy: NumberSumStrategy;
    currentCurrency: 'minor' | 'major';

    constructor(value: string) {
        this.value = value;
        this.initStrategy();
    }

    initStrategy() {
        //noinspection
        getCurrency()
            .subscribe(currency => {
                if (/\$/.test(this.value)) {
                    // класс для мажорных чисел не реализован
                    // this.strategy = new MajorStrategy(this.value, currency);
                } else {
                    this.strategy = new MinorStrategy(this.value, currency);
                }
            });
    }

    sum(value: number): string {
        this.strategy.setValue(this.strategy.getMinor() + value);
        return this.getWithCurrentCurrency();
    }

    minus(value: number): string {
        this.strategy.setValue(this.strategy.getMinor() - value);
        return this.getWithCurrentCurrency();
    }

    division(value: number): string {
        this.strategy.setValue(this.strategy.getMinor() / value);
        return this.getWithCurrentCurrency();
    }

    multiplication(value: number): string {
        this.strategy.setValue(this.strategy.getMinor() * value);
        return this.getWithCurrentCurrency();
    }

    getWithCurrentCurrency(): string {
        if (this.currentCurrency === 'minor') {
            return this.strategy.getMinorString();
        } else {
            return this.strategy.getMajorString();
        }
    }
}

function getCurrency(): Observable<Currency> {
    // стоимость валюты по задумке получается с бэка. Это эмуляция
    const result = new BehaviorSubject({
        minor: 60,
    });
    return result.asObservable();
}

export interface Currency {
    minor: number;
}

export interface NumberSumStrategy {
    getMajorString(): string;
    getMinorString(): string;
    getMinor(): number;
    getMajor(): number;
    setValue(): number;
}