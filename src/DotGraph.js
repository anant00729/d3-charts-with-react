import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DotChatWrapper from "./DotChartWrapper";
import Table from "./Table";
import { json } from "d3";

export default function DotGraph() {
  const [data, setData] = useState([]);
  const [active, setActive] = useState("");

  useEffect(() => {
    json("https://udemy-react-d3.firebaseio.com/children.json")
      .then((resData) => {
        console.log(`resData`, resData);
        setData(resData);
      })
      .catch((error) => console.log(`error.message`, error.message));
  }, []);

  const updateActiveName = (activeName) => {
    console.log(`activeName`, activeName);
    setActive(activeName);
  };

  const renderDotChart = () => {
    if (!data.length) {
      return "No data yet";
    } else {
      return <DotChatWrapper data={data} updateActiveName={updateActiveName} />;
    }
  };

  const updateData = (newData) => setData(newData);

  return (
    <div>
      <Container>
        <Row>
          <Col md={6} xs={12}>
            {renderDotChart()}
          </Col>
          <Col md={6} xs={12}>
            <Table data={data} updateData={updateData} activeName={active} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
