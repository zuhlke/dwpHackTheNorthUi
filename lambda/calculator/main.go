package main

import (
	"github.com/aws/aws-lambda-go/lambda"
)

type LoanRequest struct {
	LoanAmount   int     `json:"loanAmount"`
	LoanInterest float64 `json:"loanInterest"`
	LoanMonths   int     `json:"loanMonths"`
}

type LoanResult struct {
	MonthlyPayment float64 `json:"monthlyPayment"`
	TotalCost      float64 `json:"totalCost"`
	BeerPints      int     `json:"beerPints"`
	CigarettePacks int     `json:"cigarettePacks"`
	PygmyGoatKids  int     `json:"pygmyGoatKids"`
}

func HandleRequest(request LoanRequest) (LoanResult, error) {
	var loan = Loan{
		loanAmount:   LoanAmount{request.LoanAmount},
		loanInterest: LoanInterest{annualCompound: request.LoanInterest},
		loanTime:     LoanTime{months: request.LoanMonths},
	}

	return LoanResult{
		MonthlyPayment: loan.GetMonthlyPayment(),
		TotalCost:      loan.GetTotalCost(),
		BeerPints:      loan.GetBeerCount(),
		CigarettePacks: loan.GetCigarettePackCount(),
		PygmyGoatKids:  loan.GetPygmyGoatKidsCount(),
	}, nil
}

func main() {
	lambda.Start(HandleRequest)
}
