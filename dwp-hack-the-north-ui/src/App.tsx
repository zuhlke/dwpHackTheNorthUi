import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import { Footer } from "./common/Footer";
import { Header } from "./common/Header";
import { Home } from "./Home/Home";
import { Questionnaire } from './Questionnaire/Questionnaire';
import { Questionnaire1 } from './Questionnaire/Questionnaire1';
import { Questionnaire2 } from './Questionnaire/Questionnaire2';
import { Questionnaire3 } from './Questionnaire/Questionnaire3';
import { Result } from './Result/Result';

export const App: React.FC = () => {
    return <div>
        <Header/>
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route exact={true} path="/" component={Home}/>
                    {/*<Route path="/Questionnaire" component={Questionnaire}/>*/}
                    <Route path="/Questionnaire/1" component={Questionnaire1}/>
                    <Route path="/Questionnaire/2" component={Questionnaire2}/>
                    <Route path="/Questionnaire/3" component={Questionnaire3}/>
                    <Route path="/Result" component={Result}/>
                </Switch>
            </BrowserRouter>
        </div>
        <Footer/>
    </div>
};
