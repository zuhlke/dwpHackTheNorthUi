import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, Store} from 'redux';
import {App} from './App';
import './index.scss';
import {LoanSegment, reducer, UserInputState} from './reducers/Reducer';
import * as serviceWorker from './serviceWorker';

const questionState: Store<UserInputState, LoanSegment> = createStore(reducer);

ReactDOM.render(
    <Provider store={questionState}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
