import React from "react";
import "./style.css";

function SortButton(props) {
    return (
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Sort
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {props.sortView}
            </div>
        </div>
    );
};

export default SortButton;