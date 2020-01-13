import React, {ReactElement} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import Button from "../common/Button/Button";

interface HomeProps extends RouteComponentProps {
    id: string;
}

const Home = (props: HomeProps): ReactElement => {
    const start = (): void => props.history.push('Questionnaire');
    return (
        <div className="govuk-width-container">
            <div className="govuk-breadcrumbs">
                <ol className="govuk-breadcrumbs__list">
                    <li className="govuk-breadcrumbs__list-item">
                        <a className="govuk-breadcrumbs__link" href="#">Home</a>
                    </li>
                    <li className="govuk-breadcrumbs__list-item">
                        <a className="govuk-breadcrumbs__link" href="#">Section</a>
                    </li>
                    <li className="govuk-breadcrumbs__list-item" aria-current="page">Subsection</li>
                </ol>
            </div>

            <main className="govuk-main-wrapper " id="main-content" role="main">
                <div className="govuk-grid-row">
                    <div className="govuk-grid-column-two-thirds">
                        <h1 className="govuk-heading-xl">Loan calculator</h1>
                        <p className="govuk-body">Use this service to:</p>
                        <ul className="govuk-list govuk-list--bullet">
                            <li>Calculate how much a loan will cost</li>
                        </ul>
                        <p className="govuk-body">Takes less than one minute.</p>
                        <Button text="Start now" onClick={start}></Button>
                    </div>
                </div>
            </main>
        </div>
    )
};

export default withRouter(Home);
