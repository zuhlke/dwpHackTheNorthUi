import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { MainContent } from '../common/Content/MainContent';
import { BreadcrumbListProps } from '../common/Breadcrumb/Breadcrumb';
import { ReactElement } from 'react';

interface ResultInformation {
    loanAmount: string;
    loanInterest: string;
}

interface ResultProps extends RouteComponentProps<ResultInformation> {
    loanAmount: number;
    loanInterest: number;
}

function getBreadcrumbInformation(props: ResultProps): BreadcrumbListProps {
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
            </ul>
        </div>
    );
}

export const Result: React.FC<ResultProps> = (props: ResultProps) => {
    return (
        <div>
            <MainContent breadcrumbData={getBreadcrumbInformation(props)} reactiveContent={getContent(props)}/>
        </div>
    );
};

export default withRouter(Result);