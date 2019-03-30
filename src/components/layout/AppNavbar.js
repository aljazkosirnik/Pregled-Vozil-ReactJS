import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";

class AppNavbar extends Component {
  state = {
    isAuthenticated: false
  };

  static getDerivedStateFromProps(props, state) {
    const { auth } = props;

    if (auth.uid) {
      return { isAuthenticated: true };
    } else {
      return { isAuthenticated: false };
    }
  }

  onLogoutClick = e => {
    e.preventDefault();

    const { firebase } = this.props;

    firebase.logout();
  };

  render() {
    const { isAuthenticated } = this.state;
    const { auth } = this.props;

    return (
      <nav className="navbar">
        <div className="container">
          <ul className="navbar-list">
            <li className="nav-item">
              <Link to="/" className="navbar-brand">
                Pregled Vozil
              </Link>
            </li>
            {isAuthenticated ? (
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Nadzorna Plošča
                </Link>
              </li>
            ) : null}
            {isAuthenticated ? (
              <li className="nav-item">
                <Link to="/vehicle/add" className="nav-link">
                  Dodaj
                </Link>
              </li>
            ) : null}
          </ul>
          {isAuthenticated ? (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a href="#!" className="nav-link">
                  {auth.email}
                </a>
              </li>

              <li className="nav-item">
                <a href="#!" className="nav-link" onClick={this.onLogoutClick}>
                  Odjava
                </a>
              </li>
            </ul>
          ) : null}
          {!isAuthenticated ? (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Prijava
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Registracija
                </Link>
              </li>
            </ul>
          ) : null}
        </div>
      </nav>
    );
  }
}

AppNavbar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth
  }))
)(AppNavbar);
