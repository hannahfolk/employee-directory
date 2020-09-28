import React from "react";
import "./style.css";

function EmployeeListItem(props) {
  const { image, firstName, lastName, email, phone, dob } = props;
  return (
    <tr>
      {/* <th className="employee-list-item"><span onClick={() => removeEmployee(id)} className="remove">x</span></th> */}
      <th className="employee-list-item">
        <img src={image} alt={`${firstName} ${lastName}`}></img>
      </th>
      <th className="employee-list-item">{`${firstName} ${lastName}`}</th>
      <th className="employee-list-item">{email}</th>
      <th className="employee-list-item">{phone}</th>
      <th className="employee-list-item">{dob}</th>
    </tr>
  );
}

export default EmployeeListItem;
