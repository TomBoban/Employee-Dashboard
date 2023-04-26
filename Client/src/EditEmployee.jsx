import withRouter from "./router.jsx";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

class EditEmployee extends React.Component {
  constructor() {
    super();
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

  handleSubmit = async (e) => {
    e.preventDefault();

    const employee = {
      id: this.props.params.id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: parseInt(this.state.age),
      dateOfJoining: this.state.dateOfJoining,
      title: this.state.title,
      department: this.state.department,
      employeeType: this.state.employeeType,
      currentStatus: JSON.parse(this.state.currentStatus),
    };

    await this.updateEmpToDb(employee);
  };

  updateEmpToDb = async (employee) => {
    const query = `
    mutation updateEmployee($id: String!, $employee: Employee!) {
      updateEmployee(id: $id, employee: $employee) {
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

    const data = await graphQLFetch(query, {
      id: this.props.params.id,
      employee,
    });

    if (data) {
      alert("Employee Updated Successfully");
      await this.props.navigate("/");
    }
    async function graphQLFetch(query, variables = {}) {
      try {
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
        const body = await response.text();
        const result = JSON.parse(body);

        if (result.errors) {
          const error = result.errors[0];
          if (error.extensions.code == "BAD_USER_INPUT") {
            const details = error.extensions.exception.errors.join("\n ");
            alert(`${error.message}:\n ${details}`);
          } else {
            alert(`${error.extensions.code}: ${error.message}`);
          }
        }
        return result.data;
      } catch (e) {
        alert(`Error in sending data to server: ${e.message}`);
      }
    }
  };

  render() {
    return (
      <div className="pot">
        <Container>
          <Row>
            <div className="col-md-4 form-tagline">
              <div id="form-header" className="col-12">
                <i className="fa fa-envelope fa-5x"></i>
                <div className="form-tagline">
                  <p>Lets Make our Team Bigger</p>
                </div>
                <h1 id="title">Edit Employee Data</h1>
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
                      onChange={(e) => this.setState({ title: e.target.value })}
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
                      onChange={(e) =>
                        this.setState({ department: e.target.value })
                      }
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
                      onChange={(e) =>
                        this.setState({ currentStatus: e.target.value })
                      }
                    >
                      <option value="true">Working</option>
                      <option value="false">Retired</option>
                    </select>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-sm-12 submit-button">
                    <button
                      type="submit"
                      id="submit"
                      className="btn btn-default"
                      aria-pressed="true"
                      onClick={this.handleSubmit}
                    >
                      Update Form
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(EditEmployee);
