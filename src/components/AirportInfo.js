import React, {useState} from 'react';
import './AirportInfo.css';
import Places from "./Places";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import currencies from "../data/currencies";

function AirportInfo() { 
    //Input Values
    const [currency, setCurrency] = useState(currencies[0]);
    const [whereFrom, setWhereFrom] = useState("");
    const [whereTo, setWhereTo] = useState("");
    const [deperatureDate, setDepartureDate] = useState("");
    const [returnDate, setReturnDate] = useState("");


    const [showResults,setShowResults] = useState(false)
    const [places, setPlaces] = useState([])
    const [currentCurrency, setCurrentCurrency] = useState([])
    const [quotes, setQuotes] = useState([]);
    const [error, setError] = useState(false);
    // const [searchResult, setSearchResult] = useState([]);

    //Form Validation
    // const [hasButtonClicked, setHasButtonClicked] = useState(false);
    // const [validInput, setValidInput] = useState(false);

   
    const searchForFlights = (e)=>{
        e.preventDefault();
        async function fetchMyAPI() {
            try{
                const reqOptions = {
                    method: 'GET',
                    headers: {
                        "x-rapidapi-key": "f1645d5175mshecf9c3221481c5ep1addd7jsn6adcb6fc523c",
                        "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                        "useQueryString": true
                    }
                }
                let response = await fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/us/${currency}/en-us/${whereFrom}/${whereTo}/anytime/anytime`, reqOptions)
                response = await response.json()
                // setSearchResult(response);
                setQuotes(response.Quotes)
                setCurrentCurrency(response.Currencies)
                setPlaces(response.Places)
                console.log(response)
                setShowResults(true);
                setError(false);
            }
            catch(err){
                console.log(err);
                setShowResults(false);
                setError(true);
            }
        }
        fetchMyAPI(); 
        

        setWhereFrom("");
        setWhereTo("");
        setDepartureDate("");
        setReturnDate("");
    }
    
    
    return(
        <div className="container-fluid py-4">
            <h1 className="text-center pt-4">Search for Flights </h1>
            <Form id="flight-form" className="w-75 mx-auto py-2 container-fluid">
                <Row>
                    <Col xl={2} lg={2}>
                        <Form.Group>
                            <Form.Control as="select" id="currencies" value={currency} onChange= {(e)=> setCurrency(e.target.value)} custom>
                                {currencies.map((currencyOption,index)=>{
                                    return(
                                        <option key={index}>{currencyOption}</option>
                                    )
                                })}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xl={3} lg={3}>
                        <Form.Control id="where-from" placeholder="Where from?" value={whereFrom} onChange={(e)=> setWhereFrom(e.target.value) }/>
                        <div id="where-from-invalid" className="invalid-feedback">You entered an empty location!</div>
                    </Col>
                    <Col xl={3} lg={3}>
                        <Form.Control id="where-to" placeholder="Where to?" value={whereTo} onChange={(e)=> setWhereTo(e.target.value) }/>
                        <div id="where-to-invalid" className="invalid-feedback">You entered an empty location!</div>
                    </Col>
                    <Col xl={3} lg={3}>
                        <Form.Control id="departure-date" placeholder="Departure Date (yy-mm-dd)" value={deperatureDate} onChange={(e)=> setDepartureDate(e.target.value) }/>
                        <div id="departure-date-nvalid" className="invalid-feedback">You entered an empty deperature date!</div>
                    </Col>
                    <Col xl={3} lg={3}>
                        <Form.Control id="return-date" placeholder="Return Date (yy-mm-dd)" value={returnDate} onChange={(e)=> setReturnDate(e.target.value) }/>
                        <div id="return-date-invalid" className="invalid-feedback">You entered an empty return date!</div>
                    </Col>
                </Row>
                <Row className="justify-content-center pt-4">
                    <Button type="submit" onClick={searchForFlights} className="rounded-pill px-4">Search</Button>
                </Row>
            </Form>

            { showResults ? (
                    <Places quotes={quotes} currency={currentCurrency} places={places} error={error}></Places> 
                )
                : <></>
                
            }
        </div>
    )
}

export default AirportInfo;
