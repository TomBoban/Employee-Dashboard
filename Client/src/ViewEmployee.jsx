import React, { createRef } from "react";
import withRouter from "./router.jsx";
import { Container, Row } from "react-bootstrap";

class ViewEmployee extends React.Component {
  constructor() {
    super();
    this.topRef = createRef();
    this.state = {
      employeeID: null,
      loadData: true,
      firstName: "",
      lastName: "",
      age: "",
      dateOfJoining: "",
      title: "",
      department: "",
      employeeType: "",
      currentStatus: "",
    };
  }

  componentDidMount() {
    window.scrollTo({
      top: this.topRef.current.offsetTop,
      behavior: "smooth",
    });

    this.setState({ employeeID: this.props.params.id }, () => {
      this.getEmpDetails(this.state.employeeID);
    });
  }

  getEmpDetails = async (id) => {
    const query = `
    query EmployeeById($id: String!) {
      employeeById(id: $id) {
        id
        firstName
        lastName
        age
        dateOfJoining
        title
        department
        employeeType
        currentStatus
      }
    }
  `;
    const variables = { id: this.props.params.id };
    const response = await fetch("http://localhost:3000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });
    const result = await response.text();
    const dat = JSON.parse(result);
    if (dat.errors) {
      console.log(dat.errors, "error");
    } else {
      this.setState({ loadData: false }, () => {
        this.setState({
          firstName: dat.data.employeeById.firstName,
          lastName: dat.data.employeeById.lastName,
          age: dat.data.employeeById.age,
          dateOfJoining: dat.data.employeeById.dateOfJoining,
          title: dat.data.employeeById.title,
          department: dat.data.employeeById.department,
          employeeType: dat.data.employeeById.employeeType,
          currentStatus: dat.data.employeeById.currentStatus,
        });
      });
    }
  };

  render() {
    let dateOfJoining = new Date(this.state.dateOfJoining);
    let ageAtJoining = this.state.age;
    let retirementAge = 65;

    let currentDate = new Date();
    let yearsUntilRetirement = retirementAge - ageAtJoining;
    let retirementYear = (retirementYear =
      currentDate.getFullYear() + yearsUntilRetirement);
    let retirementDate = new Date(
      retirementYear,
      dateOfJoining.getMonth() + 1,
      0
    );

    let timeRemaining = retirementDate.getTime() - currentDate.getTime();

    let daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

    let yearsRemaining;
    let daysRemainingAfterYears;
    let monthsRemaining;
    let daysLeft;
    let daysRemainingAfterMonths;

    if (daysRemaining < 0) {
      yearsRemaining = 0;
    } else {
      yearsRemaining = Math.floor(daysRemaining / 365);
    }

    if (daysRemaining < 0) {
      monthsRemaining = 0;
    } else {
      daysRemainingAfterYears = daysRemaining - yearsRemaining * 365;
      monthsRemaining = Math.floor(daysRemainingAfterYears / 30);
    }

    if (daysRemaining < 0) {
      daysLeft = 0;
    } else {
      daysRemainingAfterMonths = daysRemainingAfterYears - monthsRemaining * 30;
      daysLeft = daysRemainingAfterMonths % 30;
    }

    return (
      <div className="pot" ref={this.topRef}>
        <Container>
          <Row>
            <div className="col-md-12 retire">
              <div>
                <h3>Retirement Info:</h3>
              </div>
              <div className="view_retire">
                <p>Years left for retirement: {yearsRemaining}</p>
                <p>Months left for retirement: {monthsRemaining}</p>
                <p>Days left for retirement: {daysLeft}</p>
              </div>
            </div>
            <div className="col-md-4 form-tagline">
              <div id="form-header" className="col-12">
                <i className="fa fa-envelope fa-5x"></i>
                <div className="form-tagline">
                  <p>Lets Make our Team Bigger</p>
                </div>
                <h1 id="title">View Employee Data</h1>
              </div>
            </div>

            <div id="form-content" className="col-md-8">
              <form>
                <div className="row form-group">
                  <div className="col-sm-3">
                    <label
                      id="name-label"
                      className="control-label"
                      htmlFor="firstName"
                    >
                      First Name:
                    </label>
                  </div>

                  <div className="input-group col-sm-9">
                    <input
                      id="firstName"
                      type="text"
                      className="form-control"
                      placeholder="Please Enter Your First Name"
                      name="firstName"
                      value={this.state.firstName}
                      readOnly
                      required
                    />
                  </div>
                </div>

                <div className="row form-group">
                  <div className="col-sm-3">
                    <label
                      id="name-label"
                      className="control-label"
                      htmlFor="lastName"
                    >
                      Last Name:
                    </label>
                  </div>

                  <div className="input-group col-sm-9">
                    <input
                      id="lastName"
                      type="text"
                      className="form-control"
                      placeholder="Please Enter Your Last Name"
                      name="lastName"
                      value={this.state.lastName}
                      readOnly
                      required
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-sm-3">
                    <label
                      id="number-label"
                      className="control-label"
                      htmlFor="age"
                    >
                      Age :
                    </label>
                  </div>

                  <div className="input-group col-sm-9">
                    <input
                      type="number"
                      className="form-control"
                      id="age"
                      placeholder="Enter Your Age"
                      name="age"
                      min="20"
                      max="65"
                      value={this.state.age}
                      readOnly
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-sm-3">
                    <label className="control-label" htmlFor="dateOfJoining">
                      Date Of Joining:
                    </label>
                  </div>
                  <div className="input-group col-sm-9">
                    <input
                      id="dateOfJoining"
                      name="dateOfJoining"
                      className="form-control"
                      type="date"
                      required
                      value={this.state.dateOfJoining}
                      readOnly
                    />
                  </div>
                </div>

                <div className="row form-group">
                  <div className="col-sm-3">
                    <label
                      id="name-label"
                      className="control-label"
                      htmlFor="title"
                    >
                      Title:
                    </label>
                  </div>

                  <div className="input-group col-sm-9">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      name="title"
                      value={this.state.title}
                      readOnly
                    >
                      <option>Employee</option>
                      <option>Manager</option>
                      <option>Director</option>
                    </select>
                  </div>
                </div>

                <div className="row form-group">
                  <div className="col-sm-3">
                    <label
                      id="name-label"
                      className="control-label"
                      htmlFor="department"
                    >
                      Department:
                    </label>
                  </div>

                  <div className="input-group col-sm-9">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      name="department"
                      required
                      value={this.state.department}
                      readOnly
                    >
                      <option>IT</option>
                      <option>Marketing</option>
                      <option>HR</option>
                      <option>Engineering</option>
                    </select>
                  </div>
                </div>

                <div className="row form-group">
                  <div className="col-sm-3">
                    <label
                      id="name-label"
                      className="control-label"
                      htmlFor="employeeType"
                    >
                      Employee Type:
                    </label>
                  </div>

                  <div className="input-group col-sm-9">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      name="employeeType"
                      required
                      value={this.state.employeeType}
                      readOnly
                    >
                      <option>FullTime</option>
                      <option>PartTime</option>
                      <option>Contract</option>
                      <option>Seasonal</option>
                    </select>
                  </div>
                </div>

                <div className="row form-group">
                  <div className="col-sm-3">
                    <label
                      id="name-label"
                      className="control-label"
                      htmlFor="status"
                    >
                      Current Status:
                    </label>
                  </div>

                  <div className="input-group col-sm-9">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      name="currentStatus"
                      value={this.state.currentStatus}
                      readOnly
                    >
                      <option value="true">Working</option>
                      <option value="false">Retired</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
          </Row>
        </Container>
      </div>
    );
    4;
  }
}

export default withRouter(ViewEmployee);
