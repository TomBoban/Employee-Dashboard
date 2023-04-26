import { Container, Row, Col, Form, Button } from "react-bootstrap";
import withRouter from "./router.jsx";

class AddEmployee extends React.Component {
  constructor() {
    super();
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const form = document.forms.addEmployee;

    const employee = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      age: form.age.value,
      dateOfJoining: form.dateOfJoining.value,
      title: form.title.value,
      department: form.department.value,
      employeeType: form.employeeType.value,
      currentStatus: form.currentStatus.value,
    };

    await this.addEmpToDb(employee);
    form.firstName.value = "";
    form.lastName.value = "";
    form.age.value = "";
    form.dateOfJoining.value = "";
  };

  addEmpToDb = async (employee) => {
    const query = `mutation {
        addEmployee(employee:{
                   
                   
                   firstName: "${employee.firstName}",
                   lastName: "${employee.lastName}",
                   age: ${employee.age},
                   dateOfJoining: "${employee.dateOfJoining}",
                   title: "${employee.title}",
                   department: "${employee.department}",
                   employeeType: "${employee.employeeType}",
                   currentStatus: ${employee.currentStatus},
          }) {
            id
            firstName
            lastName
            age
            dateOfJoining
            title
            department
            employeeType
            currentStatus
          }}`;

    const data = await graphQLFetch(query, {
      employee,
    });

    if (data) {
      alert("Employee Added Successfully");
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
        console.log(result, "result");
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
                <h1 id="title">Add an Employee</h1>
              </div>
            </div>

            <div id="form-content" className="col-md-8">
              <form
                name="addEmployee"
                id="survey-form"
                onSubmit={this.handleSubmit}
              >
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
                      max="70"
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
                    >
                      Submit Form
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

export default withRouter(AddEmployee);
