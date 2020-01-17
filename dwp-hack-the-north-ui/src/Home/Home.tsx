import React, { ReactElement } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { BreadcrumbListProps } from '../common/Breadcrumb/Breadcrumb';
import Button from "../common/Button/Button";
import { MainContent } from '../common/Content/MainContent';
import { connect } from 'react-redux';

interface HomeProps extends RouteComponentProps {
    id: string;
}

const homeContent = (props: HomeProps): ReactElement => {
    const start = (): void => props.history.push('Questionnaire');
    return (
        <div>
            <h1 className="govuk-heading-xl">Loan calculator</h1>
            <p className="govuk-body">Use this service to:</p>
            <ul className="govuk-list govuk-list--bullet">
                <li>Calculate how much a loan will cost</li>
                <li>Determine whether you can afford the loan</li>
            </ul>
            <p className="govuk-body">Takes less than one minute.</p>
            <Button text="Start now" onClick={start}></Button>
        </div>
    );
}

const Home = (props: HomeProps): ReactElement => {
    const breadcrumbProps: BreadcrumbListProps = {parentItems: [], currentItem: {visibleText: "Home: Loan Calculator"}};
    return (
        <div>
            <MainContent breadcrumbData={breadcrumbProps} reactiveContent={homeContent(props)} />
        </div>
    )
};

export default connect()(Home);
