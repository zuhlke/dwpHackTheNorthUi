package calculator

// LoanTime describes the duration of the loan.
type LoanTime struct {
	months int
}

// LoanInterest describes the APR of the loan.
type LoanInterest struct {
	annualCompound float64
}

// GetYearsTime returns the number of years that the struct holds, as the
// internal representation contains the number of Months.
func (lt LoanTime) GetYearsTime() float64 {
	return float64(lt.months) / 12.0
}

// GetMonthlyCompound returns the monthly interest derived from the annual one.
func (li LoanInterest) GetMonthlyCompound() float64 {
	return li.annualCompound / 12
}
