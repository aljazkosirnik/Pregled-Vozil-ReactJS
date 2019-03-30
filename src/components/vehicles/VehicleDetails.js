import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { firestore } from "firebase";
import Spinner from "../../components/layout/Spinner";

class VehicleDetails extends Component {
  // State for update/change mileage button
  state = {
    showMileageUpdate: false,
    newMileage: ""
  };

  // Update mileage
  mileageSubmit = e => {
    e.preventDefault();

    const { vehicle, firestore } = this.props;
    const { newMileage } = this.state;

    const vehicleUpdate = {
      vehicleMileage: parseFloat(newMileage)
    };

    // Push new mileage to firestore item based on its ID
    firestore.update(
      { collection: "vehicles", doc: vehicle.id },
      vehicleUpdate
    );
  };

  // Delete vehicle
  onDeleteClick = () => {
    const { vehicle, firestore, history } = this.props;

    // Get firestore collection, find item based on its ID, redirect to "/"
    firestore
      .delete({ collection: "vehicles", doc: vehicle.id })
      .then(history.push("/"));
  };

  // if onChange will be called setState and its key (e.target.name) to new value that is being typed in (e.target.value)
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { vehicle } = this.props;
    const { showMileageUpdate, newMileage } = this.state;

    let mileageForm = "";
    if (showMileageUpdate) {
      mileageForm = (
        <form onSubmit={this.mileageSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              name="newMileage"
              placeholder="Spremeni prevožene kilometre"
              value={newMileage}
              onChange={this.onChange}
            />
            <div className="input-group-append">
              <input
                type="submit"
                value="Spremeni"
                className="btn btn-outline-dark"
              />
            </div>
          </div>
        </form>
      );
    } else {
      mileageForm = null;
    }

    if (vehicle) {
      return (
        <div>
          <div className="row">
            <div className="top-buttons">
              <Link to="/" className="btn">
                <i className="fas fa-arrow-circle-left" /> Nazaj na nadzorno
                ploščo
              </Link>
            </div>
            <div className="top-buttons">
              <div className="btn-group">
                <Link
                  to={`/vehicle/edit/${vehicle.id}`}
                  className="btn btn-dark"
                >
                  Spremeni
                </Link>
                <button onClick={this.onDeleteClick} className="btn btn-danger">
                  Izbriši
                </button>
              </div>
            </div>
          </div>
          <div className="card">
            <h3 className="card-header">
              {vehicle.firstName} {vehicle.lastName}
            </h3>
            <div className="card-body">
              <div className="row">
                <div className="text-center">
                  <img
                    src={require(`../../img/${vehicle.vehicleType}.png`)}
                    alt=""
                  />
                  <h4>
                    ID vozila:{" "}
                    <span className="text-secondary">{vehicle.id}</span>
                  </h4>
                </div>
                <div className="text-center">
                  <h3 className="pull-right">
                    Kilometri:{" "}
                    <span>{parseFloat(vehicle.vehicleMileage)} km </span>
                    <small>
                      <a
                        href="#!"
                        onClick={() =>
                          this.setState({
                            showMileageUpdate: !this.state.showMileageUpdate
                          })
                        }
                      >
                        <i className="fas fa-pencil-alt" />
                      </a>
                    </small>
                  </h3>
                  {mileageForm}
                </div>
              </div>
              <hr />
              <ul className="list-group">
                <li className="text-center">
                  <strong>Znamka Vozila:</strong> {vehicle.vehicleBrand}
                </li>
                <li className="text-center">
                  <strong>Model Vozila:</strong> {vehicle.vehicleModel}
                </li>
                <li className="text-center">
                  <strong>Datum Zadnjega Servisa:</strong>{" "}
                  {vehicle.vehicleServiceDate}
                </li>
                <li className="text-center">
                  <strong>Voznik Vozila:</strong> {vehicle.vehicleDriver}
                </li>
                <li className="text-center">
                  <strong>Registerska Tablica:</strong>{" "}
                  {vehicle.vehicleLicencePlate}
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

VehicleDetails.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    { collection: "vehicles", storeAs: "vehicle", doc: props.match.params.id } // specify what collection we need, rename it, get ID from URL
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    // Check redux state where this is located
    vehicle: ordered.vehicle && ordered.vehicle[0]
  }))
)(VehicleDetails);
