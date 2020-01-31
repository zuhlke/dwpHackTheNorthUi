package calculator

import (
	"testing"

	. "github.com/stretchr/testify/assert"
)

var fiveYears = LoanTime{months: 60}
var oneAndAHalfYears = LoanTime{months: 18}
var twelvePercentAnnual = LoanInterest{annualCompound: 0.12}

var loanOne = Loan{loanTime: LoanTime{months: 360}, loanInterest: LoanInterest{annualCompound: 0.06}, loanAmount: LoanAmount{amount: 100000}}

func TestGetYears(t *testing.T) {
	t.Log("Loan time can handle returning decimal places for Years")
	Equal(t, 1.5, oneAndAHalfYears.GetYearsTime())
}

func TestMonthlyInterestRate(t *testing.T) {
	t.Log("Loan Interest Rates can derive the Monthly compound interest rate from the Annual rate")
	Equal(t, 0.01, twelvePercentAnnual.GetMonthlyCompound())
}

func TestLoanDiscountFactor(t *testing.T) {
	t.Log("Loans have a discount factor, taking into consideration the periodic payments and periodic interest rate")
	Equal(t, 166.7916, loanOne.GetDiscountFactorWithPrecisionLevel(4))
}

func TestMonthlyPayment(t *testing.T) {
	t.Log("Loans can return a cost per increment based on Loan amount, time and interest rate")
	Equal(t, 599.55, loanOne.GetMonthlyPayment())
}

func TestTotalCost(t *testing.T) {
	t.Log("Can return a total cost based on Loan amount, time and interest rate")
	Equal(t, 215838.0, loanOne.GetTotalCost())
}