package calculator

import (
	"testing"

	. "github.com/stretchr/testify/assert"
)

var fiveYears = LoanTime{months: 60}
var oneAndAHalfYears = LoanTime{months: 18}
var twelvePercentAnnual = LoanInterest{annualCompound: 0.12}

func TestGetYears(t *testing.T) {
	t.Log("Loan time can be obtained in both months and years")
	Equal(t, fiveYears.GetYearsTime(), 5.0)
}

func TestGetYearsNonIntegral(t *testing.T) {
	t.Log("Loan time can be obtained in both months and years")
	Equal(t, oneAndAHalfYears.GetYearsTime(), 1.5)
}

func TestAnnualInterestRate(t *testing.T) {
	t.Log("Loan Interest Rates can be obtained annually")
	Equal(t, twelvePercentAnnual.GetMonthlyCompound(), 0.01)

}
