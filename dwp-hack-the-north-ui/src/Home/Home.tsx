import {useHistory} from 'react-router-dom';
import {BreadcrumbListProps} from '../common/Breadcrumb/Breadcrumb';
import {Button} from "../common/Button/Button";
import {MainContent} from '../common/Content/MainContent';
import {History} from "history";
import React, {FC, ReactElement} from "react";

const homeContent = (history: History): ReactElement => {
    const start = (): void => history.push('Questionnaire/1');
    return (
        <div>
            <h1 className="govuk-heading-xl">Loan calculator</h1>
            <p className="govuk-body">Use this service to:</p>
            <ul className="govuk-list govuk-list--bullet">
                <li>Calculate how much a loan will cost</li>
                <li>Determine whether you can afford the loan</li>
            </ul>
            <p className="govuk-body">Takes less than one minute.</p>
            <Button text="Start now" onClick={start} arrow={true}/>
        </div>
    );
};

export const Home: FC = () => {
    const history: History = useHistory();
    const breadcrumbProps: BreadcrumbListProps = {parentItems: [], currentItem: {visibleText: "Home: Loan Calculator"}};
    return (
        <div>
            <MainContent breadcrumbData={breadcrumbProps} reactiveContent={homeContent(history)} />
        </div>
    )
};
