package main

import (
	"context"
	"github.com/aws/aws-lambda-go/lambda"
)

type LoanRequest struct {
	LoanAmount int `json:"loanAmount"`
	LoanInterest float64 `json:"loanInterest"`
	LoanMonths int `json:"loanMonths"`
}

type LoanResult struct {
	MonthlyPayment float64 `json:"monthlyPayment"`
	TotalCost float64 `json:"totalCost"`
}

func HandleRequest(ctx context.Context, request LoanRequest) (LoanResult, error) {
	var loan = Loan{
		loanAmount: LoanAmount{request.LoanAmount},
		loanInterest: LoanInterest{annualCompound: request.LoanInterest},
		loanTime: LoanTime{months: request.LoanMonths},
	}

	return LoanResult{MonthlyPayment: loan.GetMonthlyPayment(), TotalCost: loan.GetTotalCost()}, nil
}

func main() {
	lambda.Start(HandleRequest)
}