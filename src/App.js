import React from 'react';
import Header from "./components/Header";
import AirportInfo from "./components/AirportInfo";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Header title="Flights"/>
      <AirportInfo/>
      
      <Footer title="2021"/>
    </div>
  );
}

export default App;
