import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { firestore } from "firebase";
import Select from "react-select";
import Spinner from "../layout/Spinner";

class EditVehicle extends Component {
  constructor(props) {
    super(props);
    this.vehicleTypeInput = React.createRef();
    this.vehicleBrandInput = React.createRef();
    this.vehicleModelInput = React.createRef();
    this.vehicleMileageInput = React.createRef();
    this.vehicleServiceDateInput = React.createRef();
    this.vehicleDriverInput = React.createRef();
    this.vehicleLicencePlateInput = React.createRef();
  }

  vehicleTypeOptions = [
    { value: "tovornjak", label: "Tovornjak" },
    { value: "jeep", label: "Jeep" },
    { value: "avto", label: "Avto" },
    { value: "kombi", label: "Kombi" },
    { value: "tovorno-vozilo", label: "Tovorno Vozilo" }
  ];

  onSubmit = e => {
    e.preventDefault();

    const { vehicle, firestore, history } = this.props;

    const updateVehicle = {
      vehicleType: this.value,
      vehicleBrand: this.vehicleBrandInput.current.value,
      vehicleModel: this.vehicleModelInput.current.value,
      vehicleMileage: this.vehicleMileageInput.current.value,
      vehicleServiceDate: this.vehicleServiceDateInput.current.value,
      vehicleDriver: this.vehicleDriverInput.current.value,
      vehicleLicencePlate: this.vehicleLicencePlateInput.current.value
    };

    // Update vehicle in firestore
    firestore
      .update({ collection: "vehicles", doc: vehicle.id }, updateVehicle)
      .then(history.push("/"));
  };

  // Get value of dropdown of vehicleType to pass it in updateVehicle
  value = "";
  onTypeChange = e => (this.value = e.value);

  render() {
    const { vehicle } = this.props;
    if (vehicle) {
      return (
        <div className="edit-row">
          <div className="back-link">
            <Link to="/">
              <i className="fas fa-arrow-circle-left" /> Nazaj na nadzorno
              ploščo
            </Link>
          </div>
          <div className="card">
            <div className="card-header">Spremeni Podatke</div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="vehicleType">Tip Vozila</label>
                  <Select
                    type="text"
                    name="vehicleType"
                    required
                    options={this.vehicleTypeOptions}
                    value={this.vehicleTypeOptions.value}
                    ref={this.vehicleTypeInput}
                    defaultValue={vehicle.vehicleType}
                    onChange={this.onTypeChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="vehicleBrand">Znamka Vozila</label>
                  <input
                    type="text"
                    className="form-control"
                    name="vehicleBrand"
                    minLength="2"
                    required
                    ref={this.vehicleBrandInput}
                    defaultValue={vehicle.vehicleBrand}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="vehicleModel">Model Vozila</label>
                  <input
                    type="vehicleModel"
                    className="form-control"
                    name="vehicleModel"
                    ref={this.vehicleModelInput}
                    defaultValue={vehicle.vehicleModel}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="vehicleMileage">Prevoženi Kilometri</label>
                  <input
                    type="text"
                    className="form-control"
                    name="vehicleMileage"
                    required
                    ref={this.vehicleMileageInput}
                    defaultValue={vehicle.vehicleMileage}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="vehicleServiceDate">
                    Datum Zadnjega Servisa
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="vehicleServiceDate"
                    ref={this.vehicleServiceDateInput}
                    defaultValue={vehicle.vehicleServiceDate}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="vehicleDriver">Voznik</label>
                  <input
                    type="text"
                    className="form-control"
                    name="vehicleDriver"
                    ref={this.vehicleDriverInput}
                    defaultValue={vehicle.vehicleDriver}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="vehicleLicencePlate">
                    Registerska Tablica
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="vehicleLicencePlate"
                    ref={this.vehicleLicencePlateInput}
                    defaultValue={vehicle.vehicleLicencePlate}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="Spremeni"
                    className="add-vehicle-button"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

EditVehicle.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    { collection: "vehicles", storeAs: "vehicle", doc: props.match.params.id } // specify what collection we need, rename it, get ID from URL
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    vehicle: ordered.vehicle && ordered.vehicle[0]
  }))
)(EditVehicle);
