
export class LoanAmount {
    private readonly value: number;

    private constructor(value: number) {
        this.value = value;
    }

    public static from(value: number): LoanAmount {
        return new LoanAmount(value);
    }
}

export class LoanInterest {
    private readonly value: number;

    private constructor(value: number) {
        this.value = value;
    }

    public static from(value: number): LoanInterest {
        return new LoanInterest(value);
    }
}

export class LoanTime {
    private readonly years: number;

    private constructor(years: number) {
        this.years = years;
    }

    public static months(months: number): LoanTime {
        return this.years(months / 12);
    }

    public static years(years: number): LoanTime {
        return new LoanTime(years);
    }

    public getMonthsTime(): number {
        return this.years * 12;
    }

    public getYearsTime(): number {
        return this.years;
    }
}

export class Loan {
    private readonly amount: LoanAmount;
    private readonly length: LoanTime;
    private readonly rate: LoanInterest;

    private constructor(amount: LoanAmount, rate: LoanInterest, length: LoanTime) {
        this.amount = amount;
        this.length = length;
        this.rate = rate;
    }

    public static of(amount: LoanAmount, rate: LoanInterest, length: LoanTime): Loan {
        return new Loan(amount, rate, length);
    }

    public getMonthlyCost(): number {
        return 50.00;
    }
}