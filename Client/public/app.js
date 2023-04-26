const { useState, useEffect } = React;
const Navbar = () => {
  return /*#__PURE__*/ React.createElement(
    React.Fragment,
    null,
    /*#__PURE__*/ React.createElement(
      "header",
      null,
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "header",
        },
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "header_content",
          },
          /*#__PURE__*/ React.createElement(
            "div",
            {
              className: "nav_icon",
            },
            "Tom Boban"
          ),
          /*#__PURE__*/ React.createElement(
            "ul",
            {
              className: "nav_items",
            },
            /*#__PURE__*/ React.createElement(
              "li",
              null,
              /*#__PURE__*/ React.createElement(
                "a",
                {
                  href: "#",
                },
                "Home"
              )
            ),
            /*#__PURE__*/ React.createElement(
              "li",
              null,
              /*#__PURE__*/ React.createElement(
                "a",
                {
                  href: "#",
                },
                "About"
              )
            ),
            /*#__PURE__*/ React.createElement(
              "li",
              null,
              /*#__PURE__*/ React.createElement(
                "a",
                {
                  href: "#",
                },
                "Services"
              )
            ),
            /*#__PURE__*/ React.createElement(
              "li",
              null,
              /*#__PURE__*/ React.createElement(
                "a",
                {
                  href: "#",
                },
                "Contact"
              )
            )
          )
        )
      )
    )
  );
};
class DisplayEmployeeData extends React.Component {
  constructor() {
    super();
  }
  render() {
    let temp = 0;
    return /*#__PURE__*/ React.createElement(
      React.Fragment,
      null,
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "empDash",
        },
        /*#__PURE__*/ React.createElement("h1", null, "Employee Dashboard")
      ),
      /*#__PURE__*/ React.createElement(
        "table",
        {
          className: "responsiveTbl",
        },
        /*#__PURE__*/ React.createElement(
          "thead",
          {
            className: "tableHead",
          },
          /*#__PURE__*/ React.createElement(
            "tr",
            null,
            /*#__PURE__*/ React.createElement("th", null, "Sr No."),
            /*#__PURE__*/ React.createElement("th", null, "First Name"),
            /*#__PURE__*/ React.createElement("th", null, "Last Name"),
            /*#__PURE__*/ React.createElement("th", null, "Age"),
            /*#__PURE__*/ React.createElement("th", null, "Date Of Joining"),
            /*#__PURE__*/ React.createElement("th", null, "Title"),
            /*#__PURE__*/ React.createElement("th", null, "Department"),
            /*#__PURE__*/ React.createElement("th", null, "Employee Type"),
            /*#__PURE__*/ React.createElement("th", null, "Current Status")
          )
        ),
        /*#__PURE__*/ React.createElement(
          "tbody",
          null,
          this.props.employee.map((emp) => {
            const timestamp = emp.dateOfJoining;
            const date = new Date(timestamp);
            console.log(date);
            return /*#__PURE__*/ React.createElement(
              "tr",
              {
                key: emp.firstName,
              },
              /*#__PURE__*/ React.createElement("td", null, (temp += 1)),
              /*#__PURE__*/ React.createElement("td", null, emp?.firstName),
              /*#__PURE__*/ React.createElement("td", null, emp?.lastName),
              /*#__PURE__*/ React.createElement("td", null, emp?.age),
              /*#__PURE__*/ React.createElement("td", null, emp?.dateOfJoining),
              /*#__PURE__*/ React.createElement("td", null, emp?.title),
              /*#__PURE__*/ React.createElement("td", null, emp?.department),
              /*#__PURE__*/ React.createElement("td", null, emp?.employeeType),
              /*#__PURE__*/ React.createElement(
                "td",
                null,
                emp?.currentStatus == true ? "Working" : "Retired"
              )
            );
          })
        )
      )
    );
  }
}
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
      this.props.loadEmployee();
    }
    async function graphQLFetch(query, variables = {}) {
      try {
        const response = await fetch("/graphql", {
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
    return /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "container",
      },
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "row",
        },
        /*#__PURE__*/ React.createElement(
          "div",
          {
            id: "form-tagline",
            className: "col-md-4",
          },
          /*#__PURE__*/ React.createElement(
            "div",
            {
              id: "form-header",
              className: "col-12",
            },
            /*#__PURE__*/ React.createElement("i", {
              className: "fa fa-envelope fa-5x",
            }),
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "form-tagline",
              },
              /*#__PURE__*/ React.createElement(
                "p",
                null,
                "Lets Make our Team Bigger"
              )
            ),
            /*#__PURE__*/ React.createElement(
              "h1",
              {
                id: "title",
              },
              "Add an Employee"
            )
          )
        ),
        /*#__PURE__*/ React.createElement(
          "div",
          {
            id: "form-content",
            className: "col-md-8",
          },
          /*#__PURE__*/ React.createElement(
            "form",
            {
              name: "addEmployee",
              id: "survey-form",
              onSubmit: this.handleSubmit,
            },
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "row form-group",
              },
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "col-sm-3",
                },
                /*#__PURE__*/ React.createElement(
                  "label",
                  {
                    id: "name-label",
                    className: "control-label",
                    htmlFor: "firstName",
                  },
                  "First Name:"
                )
              ),
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "input-group col-sm-9",
                },
                /*#__PURE__*/ React.createElement("input", {
                  id: "firstName",
                  type: "text",
                  className: "form-control",
                  placeholder: "Please Enter Your First Name",
                  name: "firstName",
                  required: true,
                })
              )
            ),
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "row form-group",
              },
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "col-sm-3",
                },
                /*#__PURE__*/ React.createElement(
                  "label",
                  {
                    id: "name-label",
                    className: "control-label",
                    htmlFor: "lastName",
                  },
                  "Last Name:"
                )
              ),
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "input-group col-sm-9",
                },
                /*#__PURE__*/ React.createElement("input", {
                  id: "lastName",
                  type: "text",
                  className: "form-control",
                  placeholder: "Please Enter Your Last Name",
                  name: "lastName",
                  required: true,
                })
              )
            ),
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "form-group row",
              },
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "col-sm-3",
                },
                /*#__PURE__*/ React.createElement(
                  "label",
                  {
                    id: "number-label",
                    className: "control-label",
                    htmlFor: "age",
                  },
                  "Age :"
                )
              ),
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "input-group col-sm-9",
                },
                /*#__PURE__*/ React.createElement("input", {
                  type: "number",
                  className: "form-control",
                  id: "age",
                  placeholder: "Enter Your Age",
                  name: "age",
                  min: "20",
                  max: "70",
                })
              )
            ),
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "form-group row",
              },
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "col-sm-3",
                },
                /*#__PURE__*/ React.createElement(
                  "label",
                  {
                    className: "control-label",
                    htmlFor: "dateOfJoining",
                  },
                  "Date Of Joining:"
                )
              ),
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "input-group col-sm-9",
                },
                /*#__PURE__*/ React.createElement("input", {
                  id: "dateOfJoining",
                  name: "dateOfJoining",
                  className: "form-control",
                  type: "date",
                  required: true,
                })
              )
            ),
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "row form-group",
              },
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "col-sm-3",
                },
                /*#__PURE__*/ React.createElement(
                  "label",
                  {
                    id: "name-label",
                    className: "control-label",
                    htmlFor: "title",
                  },
                  "Title:"
                )
              ),
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "input-group col-sm-9",
                },
                /*#__PURE__*/ React.createElement(
                  "select",
                  {
                    className: "form-select",
                    "aria-label": "Default select example",
                    name: "title",
                  },
                  /*#__PURE__*/ React.createElement("option", null, "Employee"),
                  /*#__PURE__*/ React.createElement("option", null, "Manager"),
                  /*#__PURE__*/ React.createElement("option", null, "Director")
                )
              )
            ),
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "row form-group",
              },
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "col-sm-3",
                },
                /*#__PURE__*/ React.createElement(
                  "label",
                  {
                    id: "name-label",
                    className: "control-label",
                    htmlFor: "department",
                  },
                  "Department:"
                )
              ),
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "input-group col-sm-9",
                },
                /*#__PURE__*/ React.createElement(
                  "select",
                  {
                    className: "form-select",
                    "aria-label": "Default select example",
                    name: "department",
                    required: true,
                  },
                  /*#__PURE__*/ React.createElement("option", null, "IT"),
                  /*#__PURE__*/ React.createElement(
                    "option",
                    null,
                    "Marketing"
                  ),
                  /*#__PURE__*/ React.createElement("option", null, "HR"),
                  /*#__PURE__*/ React.createElement(
                    "option",
                    null,
                    "Engineering"
                  )
                )
              )
            ),
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "row form-group",
              },
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "col-sm-3",
                },
                /*#__PURE__*/ React.createElement(
                  "label",
                  {
                    id: "name-label",
                    className: "control-label",
                    htmlFor: "employeeType",
                  },
                  "Employee Type:"
                )
              ),
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "input-group col-sm-9",
                },
                /*#__PURE__*/ React.createElement(
                  "select",
                  {
                    className: "form-select",
                    "aria-label": "Default select example",
                    name: "employeeType",
                    required: true,
                  },
                  /*#__PURE__*/ React.createElement("option", null, "FullTime"),
                  /*#__PURE__*/ React.createElement("option", null, "PartTime"),
                  /*#__PURE__*/ React.createElement("option", null, "Contract"),
                  /*#__PURE__*/ React.createElement("option", null, "Seasonal")
                )
              )
            ),
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "row form-group",
              },
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "col-sm-3",
                },
                /*#__PURE__*/ React.createElement(
                  "label",
                  {
                    id: "name-label",
                    className: "control-label",
                    htmlFor: "status",
                  },
                  "Current Status:"
                )
              ),
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "input-group col-sm-9",
                },
                /*#__PURE__*/ React.createElement(
                  "select",
                  {
                    className: "form-select",
                    "aria-label": "Default select example",
                    name: "currentStatus",
                  },
                  /*#__PURE__*/ React.createElement(
                    "option",
                    {
                      value: "true",
                    },
                    "Working"
                  ),
                  /*#__PURE__*/ React.createElement(
                    "option",
                    {
                      value: "false",
                    },
                    "Retired"
                  )
                )
              )
            ),
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "form-group row",
              },
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "col-sm-12 submit-button",
                },
                /*#__PURE__*/ React.createElement(
                  "button",
                  {
                    type: "submit",
                    id: "submit",
                    className: "btn btn-default",
                    "aria-pressed": "true",
                  },
                  "Submit Form"
                )
              )
            )
          )
        )
      )
    );
  }
}
class HomePage extends React.Component {
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
    const response = await fetch("/graphql", {
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
      console.log("error");
    } else {
      this.setState({
        employee: dat.data.employeeList,
      });
    }
  };
  render() {
    return /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "home",
      },
      /*#__PURE__*/ React.createElement(Navbar, null),
      /*#__PURE__*/ React.createElement(AddEmployee, {
        loadEmployee: this.loadEmployee,
      }),
      /*#__PURE__*/ React.createElement(DisplayEmployeeData, {
        employee: this.state.employee,
      })
    );
  }
}
const element = /*#__PURE__*/ React.createElement(HomePage, null);
ReactDOM.render(element, document.getElementById("contents"));
