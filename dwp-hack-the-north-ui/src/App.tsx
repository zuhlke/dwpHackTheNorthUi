import {BrowserRouter, Route, Switch} from "react-router-dom";
import React from 'react';
import './App.css';
import {Home} from "./Home/Home";

const App: React.FC = () => {
    return <div>
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route exact={true} path="/" component={Home}/>
                </Switch>
            </BrowserRouter>
        </div>
    </div>
};

export default App;
