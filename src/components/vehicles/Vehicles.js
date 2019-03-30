import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { firestore } from "firebase";
import Spinner from "../layout/Spinner";

class Vehicles extends Component {
  render() {
    // destruct vehicles from props that are passed from firebase
    const { vehicles } = this.props;

    // If there are any vehicles return table
    if (vehicles) {
      return (
        <div>
          <div className="vehicles-add-button">
            <a class="btn btn-light" href="/vehicle/add/">
              Dodaj Vozilo
            </a>
          </div>
          <div>
            <table>
              <tbody>
                {/* iterate trough object vehicles */}
                {vehicles.map(vehicle => (
                  <tr key={vehicle.id}>
                    <div className="table-row">
                      <td>
                        {" "}
                        <img
                          src={require(`../../img/${vehicle.vehicleType}.png`)}
                          alt=""
                        />
                      </td>
                    </div>
                    <div className="table-row">
                      <td className="table-info">Znamka Vozila</td>
                      <td>{vehicle.vehicleBrand}</td>
                      <td className="table-info">Model Vozila</td>
                      <td>{vehicle.vehicleModel}</td>
                    </div>
                    <div className="table-row">
                      <td className="table-info">Datum Zadnjega Servisa</td>
                      <td>{vehicle.vehicleServiceDate}</td>
                      <td className="table-info">Prevoženi Kilometri</td>
                      <td>{vehicle.vehicleMileage} km</td>
                    </div>
                    <div className="table-row">
                      <td className="table-info">Voznik Vozila</td>
                      <td>{vehicle.vehicleDriver}</td>
                      <td className="table-info">Registerska Tablica</td>
                      <td>{vehicle.vehicleLicencePlate}</td>
                    </div>
                    <div className="table-row">
                      <td>
                        <Link
                          to={`/vehicle/${vehicle.id}`}
                          className="table-button"
                        >
                          <i className="fas fa-chevron-right" />
                        </Link>
                      </td>
                    </div>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );

      // If there are no vehicles or they have not been yet pulled from firebase show spinner
    } else {
      return <Spinner />;
    }
  }
}

Vehicles.propTypes = {
  firestore: PropTypes.object.isRequired,
  vehicles: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: "vehicles" }]),
  connect((state, props) => ({
    // Check redux state where this is located
    vehicles: state.firestore.ordered.vehicles
  }))
)(Vehicles);
