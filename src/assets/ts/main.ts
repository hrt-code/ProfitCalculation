import { debounceTime, distinctUntilChanged, fromEvent, interval, map, Observable, tap } from "rxjs";

const onlyNumbers = /[^0-9\n-]*/g;

//variables

let money: number = 0;

let dailyProfit: number = 0
let weeklyProfit: number = 0
let monthlyProfit: number = 0

let dayCount: number = 0
let weekCount: number = 0
let monthCount: number = 0

//elements
const initMoneyInputElement = document.querySelector("#init-money");

const dailyProfitInputElement = document.querySelector("#daily-profit");
const weeklyProfitInputElement = document.querySelector("#weekly-profit");
const monthlyProfitInputElement = document.querySelector("#monthly-profit");

const dayCountInputElement = document.querySelector("#day-count");
const weekCountInputElement = document.querySelector("#week-count");
const monthCountInputElement = document.querySelector("#month-count");

//streams
const initMoney$ = fromEvent(initMoneyInputElement as any, 'input');

const dailyProfit$ = fromEvent(dailyProfitInputElement as any, 'input');
const weeklyProfit$ = fromEvent(weeklyProfitInputElement as any, 'input');
const monthlyProfit$ = fromEvent(monthlyProfitInputElement as any, 'input');

const dayCount$ = fromEvent(dayCountInputElement as any, 'input');
const weekCount$ = fromEvent(weekCountInputElement as any, 'input');
const monthCount$ = fromEvent(monthCountInputElement as any, 'input');

//base
const baseInputNumberOperators = (source$: Observable<any>): Observable<any> => {
    return source$.pipe(
        map(event => event as KeyboardEvent),
        map(event => (event.target as HTMLInputElement).value),
        map(value => (value as string).replace(onlyNumbers, '').replace(/^\s*\n/gm, '')),
    )
}


//listeners
initMoney$
    .pipe(baseInputNumberOperators)
    .subscribe((value) => {
        money = +value;
        (initMoneyInputElement as HTMLInputElement).value = (+value).toLocaleString('en-US');
    })

dailyProfit$
    .pipe(baseInputNumberOperators,)
    .subscribe((value) => {
        dailyProfit = +value;
        (dailyProfitInputElement as HTMLInputElement).value = value + "%";
    })

weeklyProfit$
    .pipe(baseInputNumberOperators,)
    .subscribe((value) => {
        weeklyProfit = +value;
        (weeklyProfitInputElement as HTMLInputElement).value = value + "%";
    })

monthlyProfit$
    .pipe(baseInputNumberOperators,)
    .subscribe((value) => {
        monthlyProfit = +value;
        (monthlyProfitInputElement as HTMLInputElement).value = value + "%";
    })

dayCount$.pipe(baseInputNumberOperators).subscribe(value => dayCount = +value)
weekCount$.pipe(baseInputNumberOperators).subscribe(value => weekCount = +value)
monthCount$.pipe(baseInputNumberOperators).subscribe(value => monthCount = +value)











            // map(val=>val>100?"100":val),
        // map(val=>val<1?"1":val)