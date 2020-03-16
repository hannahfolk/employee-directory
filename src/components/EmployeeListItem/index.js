import React from "react";
import "./style.css";

function EmployeeListItem(props) {
  return (
    <tr>
      <th className="employee-list-item"><span onClick={() => props.removeEmployee(props.id)} className="remove">x</span></th>
      <th className="employee-list-item">{`${props.firstName} ${props.lastName}`}</th>
      <th className="employee-list-item">{props.department}</th>
      <th className="employee-list-item">{props.role}</th>
      <th className="employee-list-item">{props.email}</th>
      <th className="employee-list-item">{props.phone}</th>
      <th className="employee-list-item">{props.DOB}</th>
    </tr>
  );
}

export default EmployeeListItem;