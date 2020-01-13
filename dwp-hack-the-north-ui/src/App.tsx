import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import React from 'react';
import './App.scss';
import Home from "./Home/Home";
import { Questionnaire } from './Questionnaire/Questionnaire';
import Header from "./common/Header";
import Footer from "./common/Footer";

const App: React.FC = () => {
    return <div>
        <Header/>
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route exact={true} path="/" component={Home}/>
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

export default App;
