import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
  constructor() {
    super();
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
      <>
        <Navbar className="nav-color" variant="dark">
          <Container>
            <Navbar.Brand as={Link} to="/">
              {" "}
              Dashboard
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/add">
                  Add Employee
                </Nav.Link>
                <Nav.Link as={Link} to="/upComingRetire">
                  UpComing Retirements
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}
