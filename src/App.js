import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserIsAuthenticated, UserIsNotAuthenticated } from "./helpers/auth";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import AppNavbar from "./components/layout/AppNavbar";
import AppFooter from "./components/layout/AppFooter";
import Dashboard from "./components/layout/Dashboard";
import AddVehicle from "./components/vehicles/AddVehicle";
import EditVehicle from "./components/vehicles/EditVehicle";
import VehicleDetails from "./components/vehicles/VehicleDetails";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Settings from "./components/settings/Settings";

class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Router>
            <div className="App">
              <AppNavbar />
              <div className="container main-container">
                <Switch>
                  <Route
                    exact
                    path="/"
                    component={UserIsAuthenticated(Dashboard)}
                  />
                  <Route
                    exact
                    path="/vehicle/add"
                    component={UserIsAuthenticated(AddVehicle)}
                  />
                  <Route
                    exact
                    path="/vehicle/edit/:id"
                    component={UserIsAuthenticated(EditVehicle)}
                  />
                  <Route
                    exact
                    path="/vehicle/:id"
                    component={UserIsAuthenticated(VehicleDetails)}
                  />
                  <Route
                    exact
                    path="/login"
                    component={UserIsNotAuthenticated(Login)}
                  />
                  <Route
                    exact
                    path="/register"
                    component={UserIsNotAuthenticated(Register)}
                  />
                  <Route
                    exact
                    path="/settings"
                    component={UserIsAuthenticated(Settings)}
                  />
                </Switch>
              </div>
            </div>
          </Router>
        </Provider>
        <AppFooter />
      </div>
    );
  }
}

export default App;
