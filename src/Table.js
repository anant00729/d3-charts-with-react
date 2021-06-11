import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const centerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
};

export default function Table({ data, updateData, activeName }) {
  const [sName, setSName] = useState("");
  const [sAge, setSAge] = useState("");
  const [sHeight, setSHeight] = useState("");

  const handleRemove = (e) => {
    const newData = data.filter((d) => d.name !== e.target.name);
    updateData(newData);
  };

  const handleAddClick = (e) => {
    e.preventDefault();
    updateData([...data, { name: sName, age: sAge, height: sHeight }]);
    setSName("");
    setSAge("");
    setSHeight("");
  };

  const renderList = () => {
    return data.map(({ name, age, height }, index) => {
      const isActive = activeName === name;
      return (
        <Row
          key={index}
          style={{
            padding: "6px 0",
            backgroundColor: isActive ? "grey" : "#fff",
          }}
        >
          <Col xs={3}>
            <div style={centerStyle}>{name}</div>
          </Col>
          <Col xs={3}>
            <div style={centerStyle}>{age}</div>
          </Col>
          <Col xs={3}>
            <div style={centerStyle}>{height}</div>
          </Col>
          <Col xs={3}>
            <Button
              variant="danger"
              type="button"
              style={{ width: "100%" }}
              name={name}
              onClick={handleRemove}
            >
              Remove
            </Button>
          </Col>
        </Row>
      );
    });
  };

  return (
    <>
      <Row style={{ marginBottom: "12px" }}>
        <Col xs={3}>
          <Form.Control
            name="name"
            placeholder="Name"
            value={sName}
            onChange={(e) => setSName(e.target.value)}
          />
        </Col>
        <Col xs={3}>
          <Form.Control
            name="age"
            placeholder="Age"
            value={sAge}
            onChange={(e) => setSAge(e.target.value)}
          />
        </Col>
        <Col xs={3}>
          <Form.Control
            name="height"
            placeholder="Height"
            value={sHeight}
            onChange={(e) => setSHeight(e.target.value)}
          />
        </Col>
        <Col xs={3}>
          <Button
            variant="primary"
            type="button"
            style={{ width: "100%" }}
            onClick={handleAddClick}
          >
            Add
          </Button>
        </Col>
      </Row>
      {renderList()}
    </>
  );
}
