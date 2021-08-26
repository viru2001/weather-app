import React from 'react';
import WeatherContainer from './WeatherContainer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import CityContainer from './CityContainer';
import { useState } from 'react';

function App() {

  const [city, setCity] = useState("")
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/weather-app/">
            <CityContainer updateCity={setCity}/>
          </Route> 
          <Route exact path="/weather-app/seeWeather">
             <WeatherContainer city={city} updateCity={setCity}/>
          </Route> 
        </Switch>
      </Router>
    </>
  );
}

export default App;
