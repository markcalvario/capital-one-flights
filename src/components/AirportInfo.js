
import React, {useState} from 'react';
import './AirportInfo.css';
import Places from "./Places";

//REACT BOOTSTRAP
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import currencies from "../data/currencies";

//MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

//API KEY
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

    //USE STATE FOR INPUT VALUES
    const [currency, setCurrency] = useState(currencies[0]);
    const [whereFrom, setWhereFrom] = useState("");
    const [whereFromList, setWhereFromList] = useState([]);
    const [whereTo, setWhereTo] = useState("");
    const [whereToList, setWhereToList] = useState([]);
    const [deperatureDate, setDepartureDate] = useState(today);
    const [returnDate, setReturnDate] = useState(tomorrow);

    //VALUES BASED ON OUR SEARCH RESULT
    const [showResults,setShowResults] = useState(false)
    const [currentCurrency, setCurrentCurrency] = useState([])
    const [quotes, setQuotes] = useState([]);
    const [whereFromCity, setWhereFromCity] = useState("");
    const [whereToCity, setWhereToCity] = useState("");
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");

    //TIMEOUT 
    const [originTimeOut, setOriginTimeOut] = useState(0);
    const [destinationTimeOut, setDestinationTimeOut] = useState(0);

    //ERRORS 
    const [whereToError, setWhereToError] = useState(false);
    const [whereFromError, setWhereFromError] = useState(false);

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
            try{
                const reqOptions = {
                    method: 'GET',
                    headers: {
                        "x-rapidapi-key": `${API_KEY}`,
                        "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                        "useQueryString": true
                    }
                }
                let response = await fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/US/${currency}/en-US/${whereFrom}/${whereTo}/${deperatureDate}/${returnDate}`, reqOptions)
                response = await response.json()
                setQuotes(response.Quotes)
                setCurrentCurrency(response.Currencies)
                setShowResults(true);
                
            }
            catch(err){
                console.log(err);
                setShowResults(false);
            }
        }
        if ((whereFrom.length!==0) && (whereTo.length!==0)){
            fetchMyAPI(); 
        
            setOrigin(whereFrom);
            setDestination(whereTo);
            setWhereFrom("");
            setWhereFromCity("");
            setWhereTo("");
            setWhereToCity("");
            setDepartureDate(today);
            setReturnDate(tomorrow);
            document.getElementById("where-from").value = "";
            setWhereToError(false);
            setWhereFromError(false);
        }
        else{
            whereFrom.length === 0 ? setWhereFromError(true) : setWhereFromError(false);
            whereTo.length === 0 ? setWhereToError(true) : setWhereToError(false);
        }
    }
    
    
    return(
        <div className="container-fluid py-4">
            <h1 className="text-center pt-4">Search for Flights </h1>
            
            <div className={classes.root}>
                <Grid container spacing={4} className="w-75 mx-auto">
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
                                inputValue = {whereFromCity}
                                onChange={(event, value) => {
                                    if (value){
                                        let v = value.PlaceId
                                        setWhereFrom(v)
                                        setWhereFromCity(value.PlaceName)
                                    }
                                   
                                }}
                                options={whereFromList}
                                classes={{
                                    option: classes.option,
                                }}
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
                                            setWhereFromCity(e.target.value);
                                            setOriginTimeOut(originTimeOut+1);
                                            if (originTimeOut%2 ===0){
                                                getOriginPlaces(e);
                                            }
                                            
                                        }}
                                        
                                    />
                                )}
                            />
                            {whereFromError ? 
                                <p className="text-danger">Please enter a location!</p>:
                                <></>
                            }
                        </Grid>
                        <Grid item xl={3} className="w-25">
                            <Autocomplete
                                id="where-to" 
                                inputValue = {whereToCity}
                                onChange={(event, value) => {
                                    if (value){
                                        let v = value.PlaceId
                                        setWhereTo(v)
                                        setWhereToCity(value.PlaceName)
                                    }
                                    
                                }}
                                options={whereToList}
                                classes={{
                                    option: classes.option,
                                }}
                                getOptionLabel={(option) => option.PlaceName}
                                getOptionSelected={(option, value) => option.PlaceName === value.PlaceName }
                                renderOption={(option,key) => (
                                    <div key={key} className="container-fluid" >
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
                                            setWhereToCity(e.target.value);
                                            setDestinationTimeOut(destinationTimeOut+1);
                                            if (destinationTimeOut%2 ===0){
                                                getArrivalPlaces(e);
                                            }
                                        }}
                                        
                                    />
                                )}
                            />
                            {whereToError ? 
                                <p className="text-danger">Please enter a location!</p>:
                                <></>
                            }
                        </Grid>
                        <Grid item xs={3}>                            
                            <Form.Control className="py-4" variant="outlined" id="departure-date" type="date" placeholder="Departure Date (yy-mm-dd)" value={deperatureDate} onChange={(e)=> setDepartureDate(e.target.value) }/>
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

            {/* Flight Results UI */}
            { showResults ? (
                    <Places quotes={quotes} currency={currentCurrency} origin={origin} destination = {destination} ></Places> 
                )
                : <></>
            }
        </div>
    )
}

export default AirportInfo;
