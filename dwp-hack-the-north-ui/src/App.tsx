import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
import Footer from "./common/Footer";
import Header from "./common/Header";
import Home from "./Home/Home";
import { Questionnaire } from './Questionnaire/Questionnaire';
import { Result } from './Result/Result';

const App: React.FC = () => {

    return <div>
        <Header/>
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route exact={true} path="/" component={Home} />
                    <Route path="/Questionnaire/result" component={Result} />
                    <Route path="/Questionnaire/:questionId" component={Questionnaire} />
                    <Route path="/Questionnaire">
                        <Redirect to="/Questionnaire/1" />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
        <Footer/>
    </div>
};

export default connect()(App);
