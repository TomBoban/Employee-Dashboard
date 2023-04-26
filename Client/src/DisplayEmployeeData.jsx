import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { Alert } from "react-bootstrap";

export default class DisplayEmployeeData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterEmp: "All Employees",
    };
  }

  deleteEmployee = async (id) => {
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
    const variables = { id: id };
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
      if (dat?.data?.employeeById?.currentStatus == true) {
        alert("CAN’T DELETE EMPLOYEE – STATUS ACTIVE");
      } else {
        const query = `
        mutation deleteEmployee($id: String!) {
          deleteEmployee(id: $id) {
            id
          }
        }
      `;

        const data = await graphQLFetch(query, {
          id: id,
        });

        if (data) {
          alert("Employee Deleted Successfully");
          this.props.loadEmployee();
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
      }
    }
  };

  handleDropdownChange = async (e) => {
    this.setState({
      filterEmp: e.target.value,
    });
  };

  render() {
    let temp = 0;

    const filteredData = this.props.employee.filter(
      (item) => item.employeeType === this.state.filterEmp
    );

    return (
      <>
        <div className="empDash">
          <h1>Employee Dashboard</h1>
        </div>
        <div className="filter_main">
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.filterEmp === "All Employees"
              ? this.props.employee?.map((emp) => {
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

                      <td className="action_ed">
                        <Link to={`/show/${emp?.id}`}>
                          <button className="btn_vd">View</button>
                        </Link>
                        <Link to={`/display/${emp?.id}`}>
                          <button className="btn_ed">Edit</button>
                        </Link>
                        <button
                          className="btn_dt"
                          onClick={(e) => this.deleteEmployee(emp?.id)}
                        >
                          Delete
                        </button>
                      </td>
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

                      <td className="action_ed">
                        <Link to={`/show/${emp?.id}`}>
                          <button className="btn_vd">View</button>
                        </Link>
                        <Link to={`/display/${emp?.id}`}>
                          <button className="btn_ed">Edit</button>
                        </Link>

                        <button
                          className="btn_dt"
                          onClick={(e) => this.deleteEmployee(emp?.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </Table>
      </>
    );
  }
}
