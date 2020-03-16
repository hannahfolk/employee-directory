import React from "react";
import Title from "../Title";
import EmployeeListItem from "../EmployeeListItem";
import FilterButton from "../FilterButton";
import SortButton from "../SortButton";
import employees from "../../employees.json";

class EmployeeTable extends React.Component {
    state = {
        employees,
        filterOptions: "",
        sortView: "",
        sortChoice: "",
        orderChoice: ""
    };

    componentDidMount() {

        this.setState({
            filterOptions:
            <>
                <li className="dropdown-item" onClick={this.filter}>Acting</li>
                <li className="dropdown-item" onClick={this.filter}>Directing</li>
                <li className="dropdown-item" onClick={this.filter}>Writing</li>
                <li className="dropdown-item" onClick={this.filter}>Producing</li>
                <li className="dropdown-item" onClick={this.filter}>Music</li>
                <li className="dropdown-item" onClick={this.filter}>Cinematography</li>
                <li className="dropdown-item" onClick={this.filter}>Casting</li>
            </>,
            sortView: 
            <>
                <form>
                    <div className="form-group row">
                        <div className="col">
                            <div className="form-check">
                                <input 
                                    className="form-check-input"
                                    type="radio"
                                    name="sortOptions"
                                    id="nameSort"
                                    value="nameSort"
                                    onChange={this.handleSortChange}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="nameSort"
                                >
                                    Name
                                </label>
                            </div>
                            <div className="form-check">
                                <input 
                                    className="form-check-input"
                                    type="radio"
                                    name="sortOptions"
                                    id="departmentSort"
                                    value="departmentSort"
                                    onChange={this.handleSortChange}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="departmentSort"
                                >
                                    Department
                                </label>
                            </div>
                            <div className="form-check">
                                <input 
                                    className="form-check-input"
                                    type="radio"
                                    name="sortOptions"
                                    id="roleSort"
                                    value="roleSort"
                                    onChange={this.handleSortChange}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="roleSort"
                                >
                                    Role
                                </label>
                            </div>
                            <div className="form-check">
                                <input 
                                    className="form-check-input"
                                    type="radio"
                                    name="sortOptions"
                                    id="emailSort"
                                    value="emailSort"
                                    onChange={this.handleSortChange}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="emailSort"
                                >
                                    Email
                                </label>
                            </div>
                            <div className="form-check">
                                <input 
                                    className="form-check-input"
                                    type="radio"
                                    name="sortOptions"
                                    id="DOBSort"
                                    value="DOBSort"
                                    onChange={this.handleSortChange}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="DOBSort"
                                >    
                                    DOB
                                </label>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="orderOptions"
                                    id="ascending"
                                    value="ascending"
                                    onChange={this.handleOrderChange}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="ascending"
                                >
                                    Ascending
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="orderOptions"
                                    id="descending"
                                    value="descending"
                                    onChange={this.handleOrderChange}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="descending"
                                >
                                    Descending
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col">
                            <button
                                className="btn btn-light"
                                onClick={this.sort}
                            >
                                Add sort
                            </button>
                        </div>
                    </div>
                </form>
            </>
        });
    }

    removeEmployee = id => {
        // Filter this.state.employees for employees with an id not equal to the id being removed
        const employees = this.state.employees.filter(employee => employee.id !== id);
        // Set this.state.employees equal to the new employees array
        this.setState({ employees });
    };

    // Filter employees array by department
    filter = event => {
        // Grabs the filter choice picked by the user
        const choice = event.target.innerHTML;

        // Filters based on the user-inputted choice
        const employees = this.state.employees.filter(employee => {
            return employee.department === choice;
        });

        // Sets the employees table to the filtered employee list and changes the filter option to just the remove filter button
        this.setState({
            employees,
            filterOptions: <li className="dropdown-item" onClick={this.handleRemoveFilter}>Remove filter</li>
        });
    };

    handleRemoveFilter = () => {
        // Reset the filter options and the employee array
        this.setState({
            employees,
            filterOptions:
            <>
                <li className="dropdown-item" onClick={this.filter}>Acting</li>
                <li className="dropdown-item" onClick={this.filter}>Directing</li>
                <li className="dropdown-item" onClick={this.filter}>Writing</li>
                <li className="dropdown-item" onClick={this.filter}>Producing</li>
                <li className="dropdown-item" onClick={this.filter}>Music</li>
                <li className="dropdown-item" onClick={this.filter}>Cinematography</li>
                <li className="dropdown-item" onClick={this.filter}>Casting</li>
            </>
        });
    };

    sort = event => {
        event.preventDefault();
        let employees;

        // Grabs the choices picked by the user in the sort dropdown menu
        const sortChoice = this.state.sortChoice;
        const orderChoice = this.state.orderChoice;
        
        // Sort by the different options
            // Sort by last name
        if (sortChoice === "nameSort" && orderChoice === "ascending") {
            employees = this.state.employees.sort((a, b) => (a.lastName > b.lastName) ? 1 : -1);
        } else if (sortChoice === "nameSort" && orderChoice === "descending") {
            employees = this.state.employees.sort((a, b) => (a.lastName < b.lastName) ? 1 : -1);
            // Sort by department name
        } else if (sortChoice === "departmentSort" && orderChoice === "ascending") {
            employees = this.state.employees.sort((a, b) => (a.department > b.department) ? 1 : -1);
        } else if (sortChoice === "departmentSort" && orderChoice === "descending") {
            employees = this.state.employees.sort((a, b) => (a.department < b.department) ? 1 : -1);
            // Sort by role name
        } else if (sortChoice === "roleSort" && orderChoice === "ascending") {
            employees = this.state.employees.sort((a, b) => (a.role > b.role) ? 1 : -1);
        } else if (sortChoice === "roleSort" && orderChoice === "descending") {
            employees = this.state.employees.sort((a, b) => (a.role < b.role) ? 1 : -1);
            // Sort by email
        } else if (sortChoice === "emailSort" && orderChoice === "ascending") {
            employees = this.state.employees.sort((a, b) => (a.email > b.email) ? 1 : -1);
        } else if (sortChoice === "emailSort" && orderChoice === "descending") {
            employees = this.state.employees.sort((a, b) => (a.email < b.email) ? 1 : -1);
            // Sort by date of birth
        } else if (sortChoice === "DOBSort" && orderChoice === "ascending") {
            employees = this.state.employees.sort((a, b) => (new Date(a.DOB) > new Date(b.DOB)) ? 1 : -1);
        } else if (sortChoice === "DOBSort" && orderChoice === "descending") {
            employees = this.state.employees.sort((a, b) => (new Date(a.DOB) < new Date(b.DOB)) ? 1 : -1);
        };

        // Change the state of the employees array to the newly sorted array
        // Change the sortView to just a button that says "Remove sort"
        this.setState({
            employees,
            sortView: <ul>
                        <li className="dropdown-item" onClick={this.handleRemoveSort}>Remove sort</li>
                      </ul>
        });
    };

    handleSortChange = event => {
        // Pull the sort choice from the sort dropdown menu
        this.setState({ sortChoice: event.target.value });
    };

    handleOrderChange = event => {
        // Pull the order choice from the sort dropdown menu
        this.setState({ orderChoice: event.target.value });
    }

    handleRemoveSort = () => {
        // Reset the sort for the employees array
        const employees = this.state.employees.sort((a, b) => (a.id > b.id) ? 1 : -1);

        // Set the state to the unsorted array, and the sortView dropdown menu back to the list of options
        this.setState({
            employees,
            sortView: 
            <>
                <form onClick={this.stopPropagation} onSubmit={this.sort}>
                    <div className="form-group row">
                        <div className="col">
                            <div className="form-check">
                                <input 
                                    className="form-check-input"
                                    type="radio"
                                    name="sortOptions"
                                    id="nameSort"
                                    value="nameSort"
                                    onChange={this.handleSortChange}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="nameSort"
                                >
                                    Name
                                </label>
                            </div>
                            <div className="form-check">
                                <input 
                                    className="form-check-input"
                                    type="radio"
                                    name="sortOptions"
                                    id="departmentSort"
                                    value="departmentSort"
                                    onChange={this.handleSortChange}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="departmentSort"
                                >
                                    Department
                                </label>
                            </div>
                            <div className="form-check">
                                <input 
                                    className="form-check-input"
                                    type="radio"
                                    name="sortOptions"
                                    id="roleSort"
                                    value="roleSort"
                                    onChange={this.handleSortChange}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="roleSort"
                                >
                                    Role
                                </label>
                            </div>
                            <div className="form-check">
                                <input 
                                    className="form-check-input"
                                    type="radio"
                                    name="sortOptions"
                                    id="emailSort"
                                    value="emailSort"
                                    onChange={this.handleSortChange}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="emailSort"
                                >
                                    Email
                                </label>
                            </div>
                            <div className="form-check">
                                <input 
                                    className="form-check-input"
                                    type="radio"
                                    name="sortOptions"
                                    id="DOBSort"
                                    value="DOBSort"
                                    onChange={this.handleSortChange}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="DOBSort"
                                >    
                                    DOB
                                </label>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="orderOptions"
                                    id="ascending"
                                    value="ascending"
                                    onChange={this.handleOrderChange}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="ascending"
                                >
                                    Ascending
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="orderOptions"
                                    id="descending"
                                    value="descending"
                                    onChange={this.handleOrderChange}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="descending"
                                >
                                    Descending
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col">
                            <button
                                type="submit"
                                className="btn btn-light"
                                onClick={this.sort}
                            >
                                Add sort
                            </button>
                        </div>
                    </div>
                </form>
            </>
        })
    }

    render() {
        return (
            <>
                <Title>Employees</Title>
                <FilterButton 
                    filterOptions={this.state.filterOptions}
                />
                <SortButton
                    sortView={this.state.sortView}
                />
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Role</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>DOB</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.employees.map(employee => (
                        <EmployeeListItem
                            removeEmployee={this.removeEmployee}
                            id={employee.id}
                            key={employee.id}
                            firstName={employee.firstName}
                            lastName={employee.lastName}
                            department={employee.department}
                            role={employee.role}
                            email={employee.email}
                            phone={employee.phone}
                            DOB={employee.DOB}
                        />
                        ))}
                    </tbody>
                </table>
            </>
        );
    }
}

export default EmployeeTable;