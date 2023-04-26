import { Container } from "react-bootstrap";
import DisplayEmployeeData from "./DisplayEmployeeData.jsx";

export default class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      employee: [],
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

  render() {
    return (
      <Container fluid className="home">
        <DisplayEmployeeData
          loadEmployee={this.loadEmployee}
          employee={this.state.employee}
        />
      </Container>
    );
  }
}
