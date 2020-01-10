import React, {ReactElement} from 'react';
import {Link, RouteComponentProps, withRouter} from 'react-router-dom';
import Button from "../common/Button/Button";

interface HomeProps extends RouteComponentProps {
    id: string;
}

const Home = (props: HomeProps): ReactElement => {
    const start = (): void => props.history.push('Questionnaire');
    return (
        <div>
            Home screen
            <Button text="Start" onClick={start}></Button>
        </div>
    )
};

export default withRouter(Home);
