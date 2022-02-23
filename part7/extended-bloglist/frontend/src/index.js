import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, combineReducers } from 'redux';
import { Provider } from "react-redux";
import App from "./App";
import notificationReducer from './reducers/notificationReducer';
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";

const reducer = combineReducers({
    message: notificationReducer,
    blogs: blogReducer,
    user: userReducer
})

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>    
    </Provider>,
    document.getElementById("root")
);
