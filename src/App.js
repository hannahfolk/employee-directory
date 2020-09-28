import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Wrapper from "./components/Wrapper";
import EmployeeTable from "./components/EmployeeTable";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <>
      <Jumbotron fluid>
        <Container>
          <h1 className="display-4">Employee Directory</h1>
          <p className="lead">
            Search for an employee using any category. Click on column headers to
            sort the employees by category.
          </p>
        </Container>
      </Jumbotron>
      <Wrapper>
        <EmployeeTable />
      </Wrapper>
    </>
  );
}

export default App;
