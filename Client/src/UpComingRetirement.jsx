import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

export default class UpComingRetirement extends Component {
  constructor() {
    super();
    this.state = {
      employee: [],
      filterEmp: "All Employees",
    };
  }

  componentDidMount() {
    this.loadEmployee();
  }

  loadEmployee = async () => {
    const query = `query EmployeeList {
          employeeList {
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
          }`;
    const response = await fetch("http://localhost:3000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    });
    const result = await response.text();
    const dat = JSON.parse(result);
    if (dat.errors) {
      console.log(dat.errors, "error");
    } else {
      this.setState({ employee: dat.data.employeeList });
    }
  };
  calTime = (emp) => {
    let dateOfJoining = new Date(emp.dateOfJoining);
    let ageAtJoining = emp.age;
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
    let monthsInSixMonths = 6;

    yearsRemaining = Math.floor(daysRemaining / 365);
    daysRemainingAfterYears = daysRemaining - yearsRemaining * 365;
    monthsRemaining = Math.floor(daysRemainingAfterYears / 30);

    if (emp.age == 65 && monthsRemaining <= monthsInSixMonths) {
      return " Coming in 6 months";
    } else if (emp.age > 65) {
      return " Already Retired";
    } else {
      return "Not coming";
    }
  };

  handleDropdownChange = async (e) => {
    this.setState({
      filterEmp: e.target.value,
    });
  };

  render() {
    let temp = 0;

    const filteredData = this.state.employee.filter(
      (item) => item.employeeType === this.state.filterEmp
    );

    return (
      <div className="upComp">
        <div className="empDash">
          <h1>Employee Retirement Dashboard</h1>
        </div>
        <div className="filter_main2">
          <Form.Select
            aria-label="Default select example"
            onChange={this.handleDropdownChange}
            value={this.state.filterEmp}
            className="form-select"
            name="employeeType"
            required
          >
            <option>All Employees</option>
            <option>FullTime</option>
            <option>PartTime</option>
            <option>Contract</option>
            <option>Seasonal</option>
          </Form.Select>
        </div>

        <Table striped bordered hover className="responsiveTbl">
          <thead className="tableHead">
            <tr>
              <th>Sr No.</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Date Of Joining</th>
              <th>Title</th>
              <th>Department</th>
              <th>Employee Type</th>
              <th>Current Status</th>
              <th> UpComing Retirements</th>
            </tr>
          </thead>
          <tbody>
            {this.state.filterEmp === "All Employees"
              ? this.state.employee?.map((emp) => {
                  return (
                    <tr key={emp.firstName}>
                      <td>{(temp += 1)}</td>
                      <td>{emp?.firstName}</td>
                      <td>{emp?.lastName}</td>
                      <td>{emp?.age}</td>
                      <td>{emp?.dateOfJoining}</td>
                      <td>{emp?.title}</td>
                      <td>{emp?.department}</td>
                      <td>{emp?.employeeType}</td>
                      <td>
                        {emp?.currentStatus == true ? "Working" : "Retired"}
                      </td>
                      <td>{this.calTime(emp)}</td>
                    </tr>
                  );
                })
              : filteredData.map((emp) => {
                  return (
                    <tr key={emp.firstName}>
                      <td>{(temp += 1)}</td>
                      <td>{emp?.firstName}</td>
                      <td>{emp?.lastName}</td>
                      <td>{emp?.age}</td>
                      <td>{emp?.dateOfJoining}</td>
                      <td>{emp?.title}</td>
                      <td>{emp?.department}</td>
                      <td>{emp?.employeeType}</td>
                      <td>
                        {emp?.currentStatus == true ? "Working" : "Retired"}
                      </td>
                      <td>{this.calTime(emp)}</td>
                    </tr>
                  );
                })}
          </tbody>
        </Table>
      </div>
    );
  }
}
