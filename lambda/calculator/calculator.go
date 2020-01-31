package main

import (
	"math"
)

// LoanTime describes the duration of the loan.
type LoanTime struct {
	months int
}

// LoanInterest describes the APR of the loan.
type LoanInterest struct {
	annualCompound float64
}

// LoanAmount contains the initial amount borrowed.
type LoanAmount struct {
	amount int
}

// Loan contains the aggregated details of the loan.
type Loan struct {
	loanInterest LoanInterest
	loanTime LoanTime
	loanAmount LoanAmount
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

// GetDiscountFactor is the magic intermediary number which can provide the monthly payment cost when you divide the total loan amount by it.
func (l Loan) GetDiscountFactor() float64 {
	var commonBracket = math.Pow((1 + l.loanInterest.GetMonthlyCompound()), float64(l.loanTime.months))
	return (commonBracket - 1) / (l.loanInterest.GetMonthlyCompound() * commonBracket)
}

func round(value float64, precision int) float64 {
	var precisionDecimal = math.Pow(10.0, float64(precision))
	return math.Trunc(value * precisionDecimal + 0.5) / precisionDecimal
}

// GetDiscountFactorWithPrecisionLevel is the same as GetDiscountFactor but to a given precision level.
func (l Loan) GetDiscountFactorWithPrecisionLevel(precision int) float64 {
	return round(l.GetDiscountFactor(), precision)
}

// GetMonthlyPayment calculates the monthly payment
func (l Loan) GetMonthlyPayment() float64 {
	return round(float64(l.loanAmount.amount) / l.GetDiscountFactor(), 2)
}

// GetTotalCost calculates the total repayed
func (l Loan) GetTotalCost() float64 {
	return round(l.GetMonthlyPayment() * float64(l.loanTime.months), 2)
}
