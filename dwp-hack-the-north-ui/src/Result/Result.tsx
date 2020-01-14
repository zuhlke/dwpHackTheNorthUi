import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { MainContent } from '../common/Content/MainContent';
import { BreadcrumbListProps } from '../common/Breadcrumb/Breadcrumb';
import { ReactElement } from 'react';

interface ResultInformation {
    loanAmount: string;
    loanInterest: string;
    loanTime: string;
}

interface ResultProps extends RouteComponentProps<ResultInformation> {
    loanAmount: number;
    loanInterest: number;
    loanTime: number;
}

function getBreadcrumbInformation(): BreadcrumbListProps {
    return {
        currentItem: {visibleText: 'Results'},
        parentItems: [
            {href: '/', visibleText: 'Home'},
            {href: '/Questionnaire', visibleText: 'Questionnaire'}
        ]
    };
}

function getContent(props: ResultProps): ReactElement {
    return (
        <div>
            <h1 className="govuk-heading-x1">Your Questionnaire Results</h1>
            <ul className="govuk-list govuk-list--bullet">
                <li>Loan Amount: £{props.match.params.loanAmount}</li>
                <li>Loan Interest Rate: {props.match.params.loanInterest}%</li>
                <li>Loan Length: {props.match.params.loanTime} Months</li>
            </ul>
        </div>
    );
}

export const Result: React.FC<ResultProps> = (props: ResultProps) => {
    return (
        <div>
            <MainContent breadcrumbData={getBreadcrumbInformation()} reactiveContent={getContent(props)}/>
        </div>
    );
};

export default withRouter(Result);