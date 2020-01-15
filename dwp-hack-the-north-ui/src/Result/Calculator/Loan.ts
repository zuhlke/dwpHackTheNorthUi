
export class LoanAmount {
    private readonly value: number;

    private constructor(value: number) {
        this.value = value;
    }

    public static from(value: number): LoanAmount {
        return new LoanAmount(value);
    }

    public getTotal(): number {
        return this.value;
    }
}


export class LoanInterest {
    private readonly annualPercentageRate: number;
    private readonly compoundIncrementCount: number;

    private constructor(value: number, compoundIncrements: number) {
        this.annualPercentageRate = Number(value.toFixed(2));
        this.compoundIncrementCount = compoundIncrements;
    }

    public static of(annualInterestRate: number, compoundIncrementCount: number): LoanInterest {
        return new LoanInterest(annualInterestRate, compoundIncrementCount);
    }

    public static annualCompound(annualPercentageRate: number): LoanInterest {
        return this.of(annualPercentageRate, 1);
    }

    public static monthlyCompound(monthlyPercentageRate: number): LoanInterest {
        return this.of(monthlyPercentageRate * 12, 12);
    }

    public static monthlyCompoundWithAnnualRate(annualPercentageRate: number): LoanInterest {
        return this.of(annualPercentageRate, 12);
    }

    public getMonthlyRate(): number {
        return Number((this.annualPercentageRate / 12).toFixed(2));
    }

    public getAnnualRate(): number {
        return this.annualPercentageRate;
    }

    public getCompoundIncrementCount(): number {
        return this.compoundIncrementCount;
    }

    public getPeriodicInterestRate(): number {
        return this.annualPercentageRate / this.compoundIncrementCount;
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


export interface LoanCalculator {
    getDiscountFactorWithPrecisionLevel(precisionLevel: number): number;
    getIncrementPaymentCost(): number;
    getPeriodicPayments(): number;
    getTotalPaymentCost(): number;
}

export class Loan implements LoanCalculator {
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

    // D = {[(1 + r) ^n] - 1} / [r(1 + r)^n]}
    private getDiscountFactor(): number {
        const commonBracket = Math.pow((1 + this.rate.getPeriodicInterestRate()), this.getPeriodicPayments());
        return (commonBracket - 1) / (this.rate.getPeriodicInterestRate() * commonBracket);
    }

    public getDiscountFactorWithPrecisionLevel(precisionLevel: number): number {
        return Number(this.getDiscountFactor().toFixed(precisionLevel));
    }

    // A / D
    public getIncrementPaymentCost(): number {
        return Number((this.amount.getTotal() / this.getDiscountFactor()).toFixed(2));
    }

    public getPeriodicPayments(): number {
        return this.rate.getCompoundIncrementCount() * this.length.getYearsTime();
    }

    // (1 + r/n)^(nt)
    public getTotalPaymentCost(): number {
        const initialBracket: number = 1 + this.rate.getPeriodicInterestRate();
        const power: number = this.getPeriodicPayments();

        return this.amount.getTotal() * Number(Math.pow(initialBracket, power).toFixed(2));
    }
}