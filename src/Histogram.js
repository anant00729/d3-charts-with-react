import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import GenderDropdown from "./GenderDropdown";
import ChartWrapper from "./ChartWrapper";

export default function Histogram() {
  const [gender, setGender] = useState("men");
  const genderSelected = (gender) => setGender(gender);

  return (
    <div>
      <Container>
        <Row>
          <Col xs={12}>
            <GenderDropdown genderSelected={genderSelected} />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <ChartWrapper gender={gender} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
