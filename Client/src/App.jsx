import "babel-polyfill";
import "whatwg-fetch";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage.jsx";
import EditEmployee from "./EditEmployee.jsx";
import Header from "./Header.jsx";
import ViewEmployee from "./ViewEmployee.jsx";
import AddEmployee from "./AddEmployee.jsx";
import UpComingRetirement from "./UpComingRetirement.jsx";

export default class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Routes>
          <Route exact path="/" Component={HomePage} />
          <Route exact path="/add" Component={AddEmployee} />
          <Route exact path="/show/:id" Component={ViewEmployee} />
          <Route exact path="/display/:id" Component={EditEmployee} />
          <Route exact path="/upComingRetire" Component={UpComingRetirement} />
        </Routes>
      </>
    );
  }
}

const element = (
  <Router>
    <App />
  </Router>
);
ReactDOM.render(element, document.getElementById("contents"));
