import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface ResultInformation {
    loanAmount: string;
    loanInterest: string;
}

interface ResultProps extends RouteComponentProps<ResultInformation> {
    loanAmount: number;
    loanInterest: number;
}

export const Result: React.FC<ResultProps> = (props: ResultProps) => {
    return (
        <div>
            
        </div>
    );
};

export default withRouter(Result);