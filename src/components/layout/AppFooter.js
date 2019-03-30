import React, { Component } from "react";
import { Link } from "react-router-dom";

class AppFooter extends Component {
  render() {
    return (
      <footer>
        <div className="row footer-row">
          <h6>
            Avtor:{" "}
            <a
              href="https://aljazkosirnik.si/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Aljaž Kosirnik
            </a>
          </h6>
        </div>
        <div className="row footer-row">
          <ul>
            <a
              className="icons"
              href="https://github.com/aljazkosirnik"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github" />
            </a>
            <a
              className="icons"
              href="https://www.linkedin.com/in/aljaz-kosirnik/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin" />
            </a>
            <a className="icons" href="mailto:hello@aljazkosirnik.si">
              <i className="fas fa-envelope" />
            </a>
          </ul>
        </div>
      </footer>
    );
  }
}

export default AppFooter;
