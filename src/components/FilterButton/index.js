import React from "react";
import "./style.css";

function FilterButton(props) {
    return (
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Filter by department
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <ul>
                    {props.filterOptions}
                </ul>
            </div>
        </div>
    );
};

export default FilterButton;