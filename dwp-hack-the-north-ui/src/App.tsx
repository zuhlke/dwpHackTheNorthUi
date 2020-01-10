import {BrowserRouter, Route, Switch} from "react-router-dom";
import React from 'react';
import './App.scss';
import Home from "./Home/Home";
import {Questionnaire} from "./Questionnaire/Questionnaire";

const App: React.FC = () => {
    return <div>
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route exact={true} path="/" component={Home}/>
                    <Route path="/Questionnaire" component={Questionnaire}/>
                </Switch>
            </BrowserRouter>
        </div>
    </div>
};

export default App;
