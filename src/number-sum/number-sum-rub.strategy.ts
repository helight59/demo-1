import {Currency, NumberSumStrategy} from "./number-sum";

export class MinorStrategy implements NumberSumStrategy {
    currency: Currency;
    value: number;

    constructor(value, currency) {
        this.value = this.getNumber(value);
        this.currency = currency;
    }

    /**
     * парсинг числа из исходной строки (написан на коленке)
     * @param {string} value
     * @returns {number}
     */
    private getNumber(value: string) {
        // парсинг написан на коленке
        return parseFloat(value.match(/[\d\.]*/ig).filter(q => q)[0]);
    }

    getMajorString(): string {
        return `${this.value * this.currency.minor}руб.`;
    }

    getMinorString(): string {
        return `${this.value}руб.`;
    }

    getMinor() {
        return this.value;
    }

    getMajor() {
        return this.value * this.currency.minor;
    }

    setValue(value) {
        this.value = value;
    }
}