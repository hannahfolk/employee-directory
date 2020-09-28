import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Search from "../Search";
import EmployeeListItem from "../EmployeeListItem";
import API from "../../utils/API";

import { ReactComponent as UpIcon } from "../../assets/chevron-up.svg";
import { ReactComponent as DownIcon } from "../../assets/chevron-down.svg";

import "./style.css";

class EmployeeTable extends Component {
  state = {
    originalEmployees: [],
    employees: [],
    isToggleUp: true,
    sorted: {
      Name: true,
      Email: false,
      Phone: false,
      DOB: false,
    },
    search: {
      Name: "",
      Email: "",
      Phone: "",
      DOB: "",
    },
  };

  componentDidMount() {
    API.getEmployees().then((res) => {
      res.data.results.map((employee) => {
        return (employee.dob.date = new Date(
          employee.dob.date
        ).toLocaleDateString("en-US"));
      });

      res.data.results.sort((a, b) => (a.name.first > b.name.first ? 1 : -1));
      this.setState({
        originalEmployees: res.data.results,
        employees: res.data.results,
      });
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    if (value === "") {
      this.setState({
        search: { Name: "", Email: "", Phone: "", DOB: "" },
        employees: this.state.originalEmployees,
      });
      return;
    }

    const filtered = this.state.employees.filter((employee) => {
      let filterRequirements;
      switch (name) {
        case "Name":
          filterRequirements =
            employee.name.first.toLowerCase().startsWith(value.toLowerCase()) ||
            employee.name.last.toLowerCase().startsWith(value.toLowerCase()) ||
            `${employee.name.first} ${employee.name.last}`
              .toLowerCase()
              .startsWith(value.toLowerCase());
          break;
        case "Email":
          filterRequirements = employee.email.startsWith(value.toLowerCase());
          break;
        case "Phone":
          filterRequirements = employee.phone.startsWith(`(${value}`);
          break;
        case "DOB":
          filterRequirements = employee.dob.date.includes(value);
          break;
        default:
          return true;
      }
      return filterRequirements;
    });

    this.setState({
      search: { ...this.state.search, [name]: value },
      employees: filtered,
    });
  };

  handleBackspace = (event) => {
    if (event.keyCode === 8) {
      this.setState({
        employees: this.state.originalEmployees,
      });
    }
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
  };

  mapColumnHeaders = () => {
    const columnHeaders = ["Image", "Name", "Email", "Phone", "DOB"];

    return columnHeaders.map((columnHeader, i) => {
      if (columnHeader === "Image") {
        return (
          <th key={i} id="imageHeader">
            {columnHeader}
          </th>
        );
      } else {
        return (
          <th key={i}  data-name={columnHeader}>
            <div class="columnHeader" onClick={this.handleSortToggle}>
              {columnHeader}
              {this.state.sorted[columnHeader] ? (
                this.state.isToggleUp ? (
                  <UpIcon
                    data-name={columnHeader}
                    style={{ marginLeft: "5px" }}
                  />
                ) : (
                  <DownIcon
                    data-name={columnHeader}
                    style={{ marginLeft: "5px" }}
                  />
                )
              ) : (
                ""
              )}
            </div>
            <Search
              search={this.state.search[columnHeader]}
              columnHeader={columnHeader}
              handleChange={this.handleChange}
              handleBackspace={this.handleBackspace}
              handleFormSubmit={this.handleFormSubmit}
            />
          </th>
        );
      }
    });
  };

  handleSortToggle = async (event) => {
    const columnHeader = event.target.dataset.name;

    if (columnHeader === "Name") {
      this.setState({
        sorted: {
          Name: true,
          Email: false,
          Phone: false,
          DOB: false,
        },
      });
    } else if (columnHeader === "Email") {
      this.setState({
        sorted: {
          Name: false,
          Email: true,
          Phone: false,
          DOB: false,
        },
      });
    } else if (columnHeader === "Phone") {
      this.setState({
        sorted: {
          Name: false,
          Email: false,
          Phone: true,
          DOB: false,
        },
      });
    } else if (columnHeader === "DOB") {
      this.setState({
        sorted: {
          Name: false,
          Email: false,
          Phone: false,
          DOB: true,
        },
      });
    }

    this.state.isToggleUp
      ? await this.setState({ isToggleUp: false })
      : await this.setState({ isToggleUp: true });

    this.sortEmployees(columnHeader, this.state.isToggleUp);
  };

  sortEmployees = (columnHeader, isToggleUp) => {
    if (isToggleUp) {
      switch (columnHeader) {
        case "Name":
          this.state.employees.sort((a, b) =>
            a.name.first > b.name.first ? 1 : -1
          );
          break;
        case "Email":
          this.state.employees.sort((a, b) => (a.email > b.email ? 1 : -1));
          break;
        case "Phone":
          this.state.employees.sort((a, b) => (a.phone > b.phone ? 1 : -1));
          break;
        case "DOB":
          this.state.employees.sort((a, b) =>
            new Date(a.dob.date) > new Date(b.dob.date) ? 1 : -1
          );
          break;
        default:
          return;
      }
    } else {
      switch (columnHeader) {
        case "Name":
          this.state.employees.sort((a, b) =>
            a.name.first < b.name.first ? 1 : -1
          );
          break;
        case "Email":
          this.state.employees.sort((a, b) => (a.email < b.email ? 1 : -1));
          break;
        case "Phone":
          this.state.employees.sort((a, b) => (a.phone < b.phone ? 1 : -1));
          break;
        case "DOB":
          this.state.employees.sort((a, b) =>
            new Date(a.dob.date) < new Date(b.dob.date) ? 1 : -1
          );
          break;
        default:
          return;
      }
    }
    this.setState({
      employees: this.state.employees,
    });
  };

  render() {
    return (
      <>
        <Table striped bordered>
          <thead>
            <tr>{this.mapColumnHeaders()}</tr>
          </thead>
          <tbody>
            {this.state.employees.map((employee) => (
              <EmployeeListItem
                // removeEmployee={this.removeEmployee}
                key={employee.id.value}
                image={employee.picture.thumbnail}
                firstName={employee.name.first}
                lastName={employee.name.last}
                email={employee.email}
                phone={employee.phone}
                dob={employee.dob.date}
              />
            ))}
          </tbody>
        </Table>
      </>
    );
  }
}

export default EmployeeTable;
