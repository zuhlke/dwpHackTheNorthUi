package main

import (
	"context"
	"github.com/aws/aws-lambda-go/lambda"
)

type LoanRequest struct {
	loanAmount int
	loanInterest float64
	loanMonths int
}

type LoanResult struct {
	monthlyPayment float64
	totalCost float64
}

func HandleRequest(ctx context.Context, request LoanRequest) (LoanResult, error) {
	var loan = Loan{
		loanAmount: LoanAmount{request.loanAmount},
		loanInterest: LoanInterest{annualCompound: request.loanInterest},
		loanTime: LoanTime{months: request.loanMonths},
	}

	return LoanResult{monthlyPayment: loan.GetMonthlyPayment(), totalCost: loan.GetTotalCost()}, nil
}

func main() {
	lambda.Start(HandleRequest)
}