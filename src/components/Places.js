import React, {useState} from 'react';
import './Places.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";

function Places(props) { 
    const [sort, setSort] = useState("Low To High");

    let quotes = props.quotes;
    let currency = props.currency;
    let origin = props.origin.toUpperCase();
    let destination = props.destination.toUpperCase();
    
    return (
        
        <div className="container-fluid w-75 py-4">
                <div className="w-25">
                    
                    {quotes ? quotes.length : 0} results
                    <Form className="py-2">
                        <Form.Group>
                            <Form.Label>Sort by Price:</Form.Label>
                            <Form.Control as="select" id="currencies" value={sort} onChange={(e)=> setSort(e.target.value)} custom>
                                <option>Low To High</option>
                                <option>High To Low</option>
                            </Form.Control>
                        </Form.Group>
                
                    </Form>
                </div>
            
            
            <ListGroup>
                {sort==="Low To High" && quotes ? 
                    (quotes.map((quote,index)=>{
                        const departure = quote.OutboundLeg;
                        const returnInfo = quote.InboundLeg;
                        return (
                            <ListGroup.Item key={index} className="py-2">
                                <Row >
                                    <Col xl={5}>
                                        <p className="my-0 font-weight-bold"> Departure Date:</p>
                                        <p className="my-0">{new Date(Date.parse(departure.DepartureDate)).toLocaleString().split(',')[0]}</p>
                                        <p>{origin.substring(0, origin.length - 4)} to {destination.substring(0, destination.length - 4)} </p>
                                    </Col>
                                    <Col xl={5}>
                                        <p className="my-0 font-weight-bold">Return Date:</p>
                                        <p className="my-0">{new Date(Date.parse(returnInfo.DepartureDate)).toLocaleString().split(',')[0]}</p>
                                        <p> {destination.substring(0, destination.length - 4)} to {origin.substring(0, origin.length - 4)} </p>
                                    </Col>
                                    <Col xl={2} className="text-center">
                                        {quote.MinPrice}
                                        {currency ? <span> {currency[0].Code}</span>:<></>}
                                    </Col>
                                </Row>      
                            </ListGroup.Item>
                        )
                    }) ): quotes ?
                    (quotes.map((quote,index, array)=>{
                        quote = array[array.length - 1 - index]
                        const departure = quote.OutboundLeg;
                        const returnInfo = quote.InboundLeg;
                        return (
                            <ListGroup.Item key={index} className="py-2">
                                <Row >
                                    <Col xl={5}>
                                        <p className="my-0 font-weight-bold"> Departure Date:</p>
                                        <p className="my-0">{new Date(Date.parse(departure.DepartureDate)).toLocaleString().split(',')[0]}</p>
                                        <p>{origin.substring(0, origin.length - 4)} to {destination.substring(0, destination.length - 4)} </p>                                    </Col>
                                    <Col xl={5}>
                                        <p className="my-0 font-weight-bold">Return Date:</p>
                                        <p className="my-0">{new Date(Date.parse(returnInfo.DepartureDate)).toLocaleString().split(',')[0]}</p>
                                        <p> {destination.substring(0, destination.length - 4)} to {origin.substring(0, origin.length - 4)} </p>
                                    </Col>
                                    <Col xl={2} className="text-center">
                                        {quote.MinPrice}
                                        {currency ? <span> {currency[0].Code}</span>:<></>}
                                    </Col>
                                </Row>      
                            </ListGroup.Item>
                        )
                    })): <></>}
            </ListGroup>
        </div>
    )
}

export default Places;