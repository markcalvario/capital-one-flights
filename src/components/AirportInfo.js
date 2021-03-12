
import React, {useState} from 'react';
import './AirportInfo.css';
import Places from "./Places";
import Form from "react-bootstrap/Form";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import currencies from "../data/currencies";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';

const API_KEY = process.env.REACT_APP_API_KEY;


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  option: {
    fontSize: 12,
    '& > span': {
      marginRight: 0,
      fontSize: 12,
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

function AirportInfo() { 
    const classes = useStyles();
    //GETTING THE DATE FOR TODAY AND TOMORROW
    let today = new Date();
    let tomorrow = new Date(today);
    today = today.toISOString().split('T')[0];
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow = tomorrow.toISOString().split('T')[0];

    //INPUT VALUES
    const [currency, setCurrency] = useState(currencies[0]);
    const [whereFrom, setWhereFrom] = useState("");
    const [whereFromList, setWhereFromList] = useState([]);
    const [whereTo, setWhereTo] = useState("");
    const [whereToList, setWhereToList] = useState([]);
    const [deperatureDate, setDepartureDate] = useState(today);
    const [returnDate, setReturnDate] = useState(tomorrow);

    //Values based on our search results
    const [showResults,setShowResults] = useState(false)
    const [places, setPlaces] = useState([])
    const [currentCurrency, setCurrentCurrency] = useState([])
    const [quotes, setQuotes] = useState([]);
    const [error, setError] = useState(false);


    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");

    const getOriginPlaces = (e) =>{
        //ORIGIN PLACE
        let startLocation = e.target.value;
        async function fetchDepartureAirport(){
            try{
                let query = startLocation.split(' ').join('&');
                const reqOptions = {
                    method: 'GET',
                    headers: {
                        "x-rapidapi-key": `${API_KEY}`,
                        "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                        "useQueryString": true
                    }
                }
                let response = await fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/?query=${query}`, reqOptions)
                response = await response.json()
                console.log(response);
                setWhereFromList(response.Places)
            }
            catch(err){
                console.log(err);
            }
        }
        if (startLocation){
            if ( startLocation.trim().length > 0){
                fetchDepartureAirport();
            }
            
        }
        
    }

    const getArrivalPlaces = (e) =>{
        //ORIGIN PLACE
        let arrivalLocation = e.target.value;
        //DESTINATION PLACE
        async function fetchArrivalAirport(){
            try{
                let query = arrivalLocation.split(' ').join('&');
                const reqOptions = {
                    method: 'GET',
                    headers: {
                        "x-rapidapi-key": `${API_KEY}`,
                        "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                        "useQueryString": true
                    }
                }
                let response = await fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/?query=${query}`, reqOptions)
                response = await response.json()
                console.log(response);
                setWhereToList(response.Places);
            }
            catch(err){
                console.log(err);
            }
        }
        if (arrivalLocation){
            if ( arrivalLocation.trim().length > 0){
                fetchArrivalAirport();
            }
            
        }
        
    }
   
    const searchForFlights = (e)=>{
        e.preventDefault();
        
        async function fetchMyAPI() {
            console.log(whereFrom);
            console.log(whereTo)
            try{
                const reqOptions = {
                    method: 'GET',
                    headers: {
                        "x-rapidapi-key": `${API_KEY}`,
                        "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                        "useQueryString": true
                    }
                }
                let response = await fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/us/${currency}/en-us/${whereFrom}/${whereTo}/${deperatureDate}/${returnDate}`, reqOptions)
                console.log(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/us/${currency}/en-us/${whereFrom}/${whereTo}/${deperatureDate}/${returnDate}`)
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
        
        setOrigin(whereFrom);
        setDestination(whereTo);
        setWhereFrom("");
        setWhereTo("");
        setDepartureDate(today);
        setReturnDate(tomorrow);
        console.log(document.getElementById("where-from"))
        document.getElementById("where-from").value = "";
    }
    
    
    return(
        <div className="container-fluid py-4">
            <h1 className="text-center pt-4">Search for Flights </h1>
            {/* <Form id="flight-form" className="w-75 mx-auto py-2 container-fluid">
                <Row>
                    <Col xl={2} lg={2}>
                        <label>Currency</label>
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
                        <Form.Control 
                            id="where-from"  
                            placeholder="Where from?" 
                            value={whereFrom} 
                            onChange={(e)=> {
                                setWhereFrom(e.target.value);
                                getOriginPlaces(e);
                            }
                            }
                        />
                        <div id="where-from-invalid" className="invalid-feedback">You entered an empty location!</div>
                    </Col>
                    <Col xl={3} lg={3}>
                        <Form.Control 
                            id="where-to" 
                            placeholder="Where to?" 
                            value={whereTo} 
                            onChange={(e)=> {
                                setWhereTo(e.target.value) ;
                                getArrivalPlaces(e);
                            }
                            }
                        />
                        <div id="where-to-invalid" className="invalid-feedback">You entered an empty location!</div>
                    </Col>
                    <Col xl={3} lg={3}>
                        <Form.Control id="departure-date" type="date" placeholder="Departure Date (yy-mm-dd)" value={deperatureDate} onChange={(e)=> setDepartureDate(e.target.value) }/>
                        <div id="departure-date-nvalid" className="invalid-feedback">You entered an empty deperature date!</div>
                    </Col>
                    <Col xl={3} lg={3}>
                        <Form.Control id="return-date" type="date" placeholder="Return Date (yy-mm-dd)" value={returnDate} onChange={(e)=> setReturnDate(e.target.value) }/>
                        <div id="return-date-invalid" className="invalid-feedback">You entered an empty return date!</div>
                    </Col>
                </Row>
                <Row className="justify-content-center pt-4">
                    <Button type="submit" onClick={searchForFlights} className="rounded-pill px-4">Search</Button>
                </Row>
            </Form> */}

            {/* <div>
                <ul>
                    {whereFromList.map((from,index)=>{
                        return(
                            <li>
                                {from.PlaceName}
                                {from.CountryId}
                                {from.PlaceId}
                            </li>
                        )
                    })}
                </ul>
            </div> */}


            <div className={classes.root}>
                <Grid container spacing={6} className="w-75 mx-auto">
                    <Grid container item xl={12} spacing={2}>
                        <Grid item xl={4}>
                            <label>Currency</label>
                            <Form.Control as="select" id="currencies" value={currency} onChange= {(e)=> setCurrency(e.target.value)} custom>
                                    {currencies.map((currencyOption,index)=>{
                                        return(
                                            <option key={index}>{currencyOption}</option>
                                        )
                                    })}
                            </Form.Control>
                        </Grid>
                    </Grid>
                    <Grid container item xl={12} spacing={2}>
                        <Grid item xl={3} className="w-25">
                            <Autocomplete
                                id="where-from"  
                                //value = {whereFrom}
                                onChange={(event, value) => {
                                    console.log(value);
                                    if (value){
                                        let v = value.PlaceId
                                        setWhereFrom(v)
                                    }
                                   
                                }}
                                options={whereFromList}
                                classes={{
                                    option: classes.option,
                                }}
                                //autoHighlight
                                getOptionLabel={(option) => option.PlaceName}
                                getOptionSelected={(option, value) => option.PlaceName === value.PlaceName }
                                renderOption={(option,key) => (
                                    <div key={key} className="container-fluid">
                                        <div className="row">
                                            <span className="col-10">{option.PlaceName}</span>
                                            <span col="col-2">{option.PlaceId.substring(0, option.PlaceId.length - 4)}</span>
                                        </div>
                                    
                                    </div>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        id="departure-date"
                                        {...params}
                                        label="Where From"
                                        variant="outlined"
                                        value={whereFrom} 
                                        onChange={(e)=> {
                                            setWhereFrom(e.target.value);
                                            getOriginPlaces(e);
                                        }}
                                        
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xl={3} className="w-25">
                            <Autocomplete
                                id="where-to" 
                                //value = ""
                                onChange={(event, value) => {
                                    if (value){
                                        let v = value.PlaceId
                                        setWhereTo(v)
                                    }
                                    
                                }}
                                options={whereToList}
                                classes={{
                                    option: classes.option,
                                }}
                                //autoHighlight
                                getOptionLabel={(option) => option.PlaceName}
                                getOptionSelected={(option, value) => option.PlaceName === value.PlaceName }
                                renderOption={(option,key) => (
                                    <div key={key} className="container-fluid">
                                        <div className="row">
                                            <span className="col-10">{option.PlaceName}</span>
                                            <span col="col-2">{option.PlaceId.substring(0, option.PlaceId.length - 4)}</span>
                                        </div>
                                    
                                    </div>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        id="return-date"
                                        {...params}
                                        label="Where To"
                                        variant="outlined"
                                        value={whereTo} 
                                        onChange={(e)=> {
                                            setWhereTo(e.target.value);
                                            getArrivalPlaces(e);
                                        }}
                                        
                                    />
                                )}
                            />

                        </Grid>
                        <Grid item xs={3}>
                    
                            {/* <TextField
                                id="date"
                                label="Birthday"
                                type="date"
                                // defaultValue="2017-05-24"
                                value={deperatureDate} 
                                onChange={(e)=> setDepartureDate(e.target.value) }
                                className={classes.textField}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            /> */}
                           
                            {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Date picker inline"
                                    value={deperatureDate} 
                                    onChange={(e)=> setDepartureDate(e.target.value) }
                                    // KeyboardButtonProps={{
                                    //     'aria-label': 'change date',
                                    // }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider> */}
                            <Form.Control className="py-4" id="departure-date" type="date" placeholder="Departure Date (yy-mm-dd)" value={deperatureDate} onChange={(e)=> setDepartureDate(e.target.value) }/>
                            <div id="departure-date-nvalid" className="invalid-feedback">You entered an empty deperature date!</div>
                        </Grid>
                        <Grid item xs={3}>
                            <Form.Control className="py-4" id="return-date" type="date" placeholder="Return Date (yy-mm-dd)" value={returnDate} onChange={(e)=> setReturnDate(e.target.value) }/>
                            <div id="return-date-invalid" className="invalid-feedback">You entered an empty return date!</div>
                        </Grid>
                    </Grid>
                    <Grid container item xl={12} spacing={2} className="mx-auto justify-content-center">
                        <Button type="submit" onClick={searchForFlights} className="rounded-pill px-4">Search</Button>
                    </Grid>
                </Grid>
            </div>
            { showResults ? (
                    <Places quotes={quotes} currency={currentCurrency} origin={origin} destination = {destination} places={places} error={error}></Places> 
                )
                : <></>
                
            }

        </div>
    )
}

export default AirportInfo;
