import React from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';
// import { withAuth } from 'msal/MsalAuthProvider';
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import { createBrowserHistory } from "history";


const hist = createBrowserHistory();
const RootApp = () => {
    return (
        <Switch>
            <Route path="/auth" component={AuthLayout} />
            <Route path="/admin" component={AdminLayout} />
            <Redirect from="/" to="/admin/dashboard" />
        </Switch>
    )
};

export default RootApp;