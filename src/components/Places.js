import React, {useState} from 'react';
import './Places.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";

function Places(props) { 
    const [sort, setSort] = useState("Low To High");
    console.log(props.error)
    let quotes = props.quotes;
    let currency = props.currency;
    let places = props.places;
    
    let origin;
    let destination;
    if (places){
        origin = places[0]; 
        destination = places[1];
    }

    



    return (
        
        <div className="container-fluid w-75 py-4">
            {props.error ? 
                (<div className="w-25">
                    <Form className="py-2">
                        <Form.Group>
                            <Form.Label>Sort by Price:</Form.Label>
                            <Form.Control as="select" id="currencies" value={sort} onChange={(e)=> setSort(e.target.value)} custom>
                                <option>Low To High</option>
                                <option>High To Low</option>
                            </Form.Control>
                        </Form.Group>
                
                    </Form>
                </div>) 
            : 
            (
                <div>0 Results</div>
            )}
            
            
            <ListGroup>
                {sort==="Low To High" && quotes ? 
                    (quotes.map((quote,index)=>{
                        const departure = quote.OutboundLeg;
                        const returnInfo = quote.InboundLeg;
                        return (
                            <ListGroup.Item key={index} className="py-2">
                                <Row >
                                    <Col xl={5}>
                                        <p className="my-0"> Departure Date:</p>
                                        <p className="my-0">{new Date(Date.parse(departure.DepartureDate)).toLocaleString().split(',')[0]}</p>
                                        {destination && origin ? <p>{origin.SkyscannerCode} to {destination.SkyscannerCode}</p>: <></>}
                                    </Col>
                                    <Col xl={5}>
                                        <p className="my-0">Return Date:</p>
                                        <p className="my-0">{new Date(Date.parse(returnInfo.DepartureDate)).toLocaleString().split(',')[0]}</p>
                                        {destination && origin ? <p>{destination.SkyscannerCode} to {origin.SkyscannerCode}</p>: <></>}
                                    </Col>
                                    <Col xl={2} className="text-center">
                                        {quote.MinPrice}
                                        {currency[0]? <span> {currency[0].Code}</span>:<></>}
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
                                        <p className="my-0"> Departure Date:</p>
                                        <p className="my-0">{new Date(Date.parse(departure.DepartureDate)).toLocaleString().split(',')[0]}</p>
                                        {destination && origin ? <p>{origin.SkyscannerCode} to {destination.SkyscannerCode}</p>: <></>}
                                    </Col>
                                    <Col xl={5}>
                                        <p className="my-0">Return Date:</p>
                                        <p className="my-0">{new Date(Date.parse(returnInfo.DepartureDate)).toLocaleString().split(',')[0]}</p>
                                        {destination && origin ? <p>{destination.SkyscannerCode} to {origin.SkyscannerCode}</p>: <></>}
                                    </Col>
                                    <Col xl={2} className="text-center">
                                        {quote.MinPrice}
                                        {currency[0]? <span> {currency[0].Code}</span>:<></>}
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