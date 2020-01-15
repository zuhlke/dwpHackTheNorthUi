import { Loan, LoanAmount, LoanCalculator, LoanInterest, LoanTime } from './Loan';

const oneHundredThousand: LoanAmount = LoanAmount.from(100000);
const oneThousand: LoanAmount = LoanAmount.from(1000);

const fiveYearsInMonths: LoanTime = LoanTime.months(60);
const fiveYears: LoanTime = LoanTime.years(5);
const thirtyYears: LoanTime = LoanTime.years(30);

const twelvePercentAnnual: LoanInterest = LoanInterest.annualCompound(0.12);
const twelvePercentMonthly: LoanInterest = LoanInterest.monthlyCompound(0.01);
const sixPercentAnnualAsMonthly: LoanInterest = LoanInterest.monthlyCompoundWithAnnualRate(0.06);
const oneThousandPercentAnnualAsMonthly: LoanInterest = LoanInterest.monthlyCompoundWithAnnualRate(10.00);

const loanOne: LoanCalculator = Loan.of(
    oneThousand,
    oneThousandPercentAnnualAsMonthly,
    fiveYears
);
const loanTwo: LoanCalculator = Loan.of(
    oneHundredThousand,
    sixPercentAnnualAsMonthly,
    thirtyYears
);

test('Loan time can be obtained in both months and years', async () => {
    expect(fiveYearsInMonths.getMonthsTime()).toBe(fiveYears.getMonthsTime());
    expect(fiveYearsInMonths.getYearsTime()).toBe(fiveYears.getYearsTime());
}, 100);

test('Loan Interest Rates can be obtained annually and monthly', async () => {
    expect(twelvePercentAnnual.getMonthlyRate()).toBe(twelvePercentMonthly.getMonthlyRate());
    expect(twelvePercentAnnual.getAnnualRate()).toBe(twelvePercentMonthly.getAnnualRate());
}, 100);

test('Can return a total cost based on Loan amount, time and interest rate', async () => {
    expect(loanOne.getTotalPaymentCost()).toBe(6229971881013844992.00);
}, 100);

test('Loans have a total number of periodic payments, based on the number of payments a year and the number of years', async () => {
    expect(loanTwo.getPeriodicPayments()).toBe(360);
}, 100);

test('Loan Rates can provide the periodic interest rate', async () => {
    expect(sixPercentAnnualAsMonthly.getPeriodicInterestRate()).toBe(0.005);
}, 100);

test('Loans have a discount factor, taking into consideration the periodic payments and periodic interest rate', async () => {
    expect(loanTwo.getDiscountFactorWithPrecisionLevel(4)).toBe(166.7916);
}, 100);

test('Loans can return a cost per increment based on Loan amount, time and interest rate', async () => {
    expect(loanTwo.getIncrementPaymentCost()).toBe(599.55);
}, 100);