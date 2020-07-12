import React from 'react';
/*

=========================================================
* Now UI Kit React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-kit-react
* Copyright 2019 Creative Tim (http://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-kit-react/blob/master/LICENSE.md)

* Designed by www.invisionapp.com Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions
* of the Software.

*/
import {Redirect, Route, Router, Switch,} from 'react-router-dom';
import {createBrowserHistory} from "history";
// styles for this kit
import "bootstrap/dist/css/bootstrap.css";
// import "./assets/scss/now-ui-dashboard.scss?v=1.3.0";
import "./assets/scss/now-ui-dashboard.scss";

import AdminLayout from 'layouts/Admin.jsx';
import AuthLayout from "layouts/Auth.jsx";

const hist = createBrowserHistory();

const ProppedRoute = ({render: C, props: childProps, ...rest}) => (
  <Route {...rest} render={(rProps) => <C {...rProps} {...childProps} />}/>
);

// https://aws-amplify.github.io/docs/js/authentication
class AuthComponent extends React.Component {
  handleStateChange = (state) => {
    // console.log(state);
    if (state === 'signedIn') {
      this.props.onUserSignIn();
    }
  };

  render() {
    // console.log("AuthComponent.render:" + JSON.stringify(this.props, null, 2));
    if (this.props.isLoggedIn) {
      return (
        <Redirect to="/"/>
      );
    }
    return (
      <div>
        <AuthLayout
          onStateChange={this.handleStateChange}
        />
      </div>
    );
  }
}


const Routes = ({childProps}) => (
  <Switch>

    <ProppedRoute
      exact
      path="/auth"
      render={AuthComponent}
      props={childProps}
    />
    <Route
      path="/auth"
      render={props => {
        return <AuthLayout {...props} />;
      }}
    />
    <Route
      path="/admin"
      render={props => {
        return <AdminLayout {...props} />;
      }}
    />

    {/*<Redirect to="/admin/dashboard" />*/}
    {/*<Route*/}
    {/*  exact*/}
    {/*  path="/about"*/}
    {/*  render={() => <div>About Content</div>}*/}
    {/*/>*/}
  </Switch>
);


class App extends React.Component {
  state = {
    authState: {
      isLoggedIn: false,
    },
  };

  handleUserSignIn = () => {
    this.setState({authState: {isLoggedIn: true}});
  };

  render() {
    const childProps = {
      isLoggedIn: this.state.authState.isLoggedIn,
      onUserSignIn: this.handleUserSignIn,
    };

    return (
      <div className="App">
        <div>
          {this.state.authState.isLoggedIn
            ? <Redirect to="/admin/curate"/>
            : <Redirect from="/auth" to="/auth/login-page"/>
          }
        </div>
        <br/>
        <Routes childProps={childProps}/>
      </div>
    );
  }
}

const AppWithRouter = () => (
  <Router history={hist}>
    <App/>
  </Router>
);

export default AppWithRouter;
