import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import store from "./redux/redux-store";
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";



// const rerenderEntireTree = () => {  //нет смысла на входе принимать state, потому что он у нас импортирован из store.tsx

    ReactDOM.render(
            <BrowserRouter>
                <Provider store={store}>
                    <App/>
                </Provider>
            </BrowserRouter>,
        document.getElementById('root')
    );



// rerenderEntireTree();
// store.subscribe(() => {
//     rerenderEntireTree()
// });//подписчиком в данном случае явл rerenderEntireTree


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
