import React from 'react'
import { Switch, Route } from "react-router-dom";
import Login from './Login';
import Register from './Register';
import AddProduct from "./AddProduct";
import UpdateProduct from "./UpdateProduct";
import ErrorPage from './ErrorPage';
import Protected from './Protected';

function App() {
    return (
        <>
            <Switch>
                <Route path="/add">
                    <Protected Cmp={AddProduct} />
                </Route>
                <Route path="/update">
                    <Protected Cmp={UpdateProduct} />
                </Route>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route component={ErrorPage} />
            </Switch>
        </>
    )
}

export default App
