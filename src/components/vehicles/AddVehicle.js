import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Select from "react-select";
import { firestoreConnect } from "react-redux-firebase";

class AddVehicle extends Component {
  // Set blank state
  state = {
    vehicleType: "",
    vehicleBrand: "",
    vehicleModel: "",
    vehicleMileage: "",
    vehicleServiceDate: "",
    vehicleDriver: "",
    vehicleLicencePlate: ""
  };

  vehicleTypeOptions = [
    { value: "tovornjak", label: "Tovornjak" },
    { value: "jeep", label: "Jeep" },
    { value: "avto", label: "Avto" },
    { value: "kombi", label: "Kombi" },
    { value: "tovorno-vozilo", label: "Tovorno Vozilo" }
  ];

  onSubmit = e => {
    e.preventDefault();

    const newVehicle = this.state;
    const { firestore } = this.props;

    // If vehicle input field is blank i get NaN, fix that
    if (newVehicle.vehicleServiceDate === "") {
      newVehicle.vehicleServiceDate = 0;
    }

    // push to firestore collection, push the object newVehicle and when promise is returned redirect to "/"
    firestore
      .add({ collection: "vehicles" }, newVehicle)
      .then(() => this.props.history.push("/"));
  };

  // if onChange will be called setState and its key (e.target.name) to new value that is being typed in (e.target.value)
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  // Vehicle type onchange
  onTypeChange = e => this.setState({ vehicleType: e.value });

  render() {
    return (
      <div className="add-row">
        <div className="back-link">
          <Link to="/">
            <i className="fas fa-arrow-circle-left" /> Nazaj na nadzorno ploščo
          </Link>
        </div>
        <div className="card">
          <div className="card-header">Dodaj Vozilo</div>
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
                  onChange={this.onTypeChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="vehicleBrand">Znamka Vozila</label>
                <input
                  type="text"
                  className="form-control"
                  name="vehicleBrand"
                  required
                  onChange={this.onChange}
                  value={this.state.vehicleBrand}
                />
              </div>
              <div className="form-group">
                <label htmlFor="vehicleModel">Model Vozila</label>
                <input
                  type="vehicleModel"
                  className="form-control"
                  name="vehicleModel"
                  onChange={this.onChange}
                  value={this.state.vehicleModel}
                />
              </div>
              <div className="form-group">
                <label htmlFor="vehicleMileage">Prevoženi Kilometri</label>
                <input
                  type="text"
                  className="form-control"
                  name="vehicleMileage"
                  required
                  onChange={this.onChange}
                  value={this.state.vehicleMileage}
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
                  onChange={this.onChange}
                  value={this.state.vehicleServiceDate}
                />
              </div>
              <div className="form-group">
                <label htmlFor="vehicleDriver">Voznik Vozila</label>
                <input
                  type="text"
                  className="form-control"
                  name="vehicleDriver"
                  onChange={this.onChange}
                  value={this.state.vehicleDriver}
                />
              </div>
              <div className="form-group">
                <label htmlFor="vehicleLicencePlate">Registerska tablica</label>
                <input
                  type="text"
                  className="form-control"
                  name="vehicleLicencePlate"
                  onChange={this.onChange}
                  value={this.state.vehicleLicencePlate}
                />
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  value="Dodaj"
                  className="add-vehicle-button"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddVehicle.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default firestoreConnect()(AddVehicle);
