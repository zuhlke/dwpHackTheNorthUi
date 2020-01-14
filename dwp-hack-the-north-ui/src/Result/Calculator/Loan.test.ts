import { Loan, LoanAmount, LoanInterest, LoanTime } from './Loan';

const fiveYearsInMonths: LoanTime = LoanTime.months(60);
const fiveYears: LoanTime = LoanTime.years(5);

test('Loan time can be obtained in both months and years', async () => {    
    expect(fiveYearsInMonths.getMonthsTime()).toBe(fiveYears.getMonthsTime());
    expect(fiveYearsInMonths.getYearsTime()).toBe(fiveYears.getYearsTime());
}, 100);

test('Can return a cost per month based on Loan amount, time and interest rate', async () => {
    const loanOne: Loan = Loan.of(
        LoanAmount.from(1000),
        LoanInterest.from(10.00),
        fiveYears
    );
    
    expect(loanOne.getMonthlyCost()).toBe(50.00);
}, 100);