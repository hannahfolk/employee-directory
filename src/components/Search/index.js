import React from "react";
import Form from "react-bootstrap/Form";

function Search(props) {
  const {
    columnHeader,
    search,
    handleChange,
    handleBackspace,
    handleFormSubmit,
  } = props;
  return (
    <Form onSubmit={handleFormSubmit} style={{ marginTop: "5px" }}>
      <Form.Group controlId="search" style={{ margin: 0 }}>
        <Form.Control
          type="search"
          placeholder="Search..."
          name={columnHeader}
          value={search}
          onChange={handleChange}
          onKeyDown={handleBackspace}
        />
      </Form.Group>
    </Form>
  );
}

export default Search;
