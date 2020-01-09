import React from 'react';
import {Link} from 'react-router-dom';

export const Home: React.FC = () => {
    return (
        <div>
            Home screen
            <Link to={"/Questionnaire"}>Questionnaire</Link>
        </div>
    )
};
