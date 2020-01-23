import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import { Footer } from "./common/Footer";
import { Header } from "./common/Header";
import { Home } from "./Home/Home";
import { Questionnaire } from './Questionnaire/Questionnaire';
import { Result } from './Result/Result';

export const App: FC = () => {
    return <div>
        <Header/>
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route exact={true} path="/" component={Home}/>
                    <Route path="/Questionnaire/:questionId" component={Questionnaire}/>
                    <Route path="/Result" component={Result}/>
                </Switch>
            </BrowserRouter>
        </div>
        <Footer/>
    </div>
};
