import React from 'react';
import './AirportInfo.css';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import currencies from "../data/currencies";

function AirportInfo() { 
    return(
        <div className="container-fluid py-4">
            <h1 className="text-center pt-4">Search for Flights </h1>
            <Form className="w-75 mx-auto py-2 container-fluid">
                <Row>
                    <Col xl={2}>
                        <Form.Group>
                            <Form.Control as="select" id="currencies" custom>
                                {currencies.map((currency,index)=>{
                                    return(
                                        <option key={index}>{currency}</option>
                                    )
                                })}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xl={3}>
                        <Form.Control placeholder="Where from?" />
                    </Col>
                    <Col xl={3}>
                        <Form.Control placeholder="Where to?" />
                    </Col>
                    <Col xl={3}>
                        <Form.Control placeholder="Departure Date" />
                    </Col>
                    <Col xl={3}>
                        <Form.Control placeholder="Return Date" />
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default AirportInfo;
