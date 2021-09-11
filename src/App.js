
import React, {useState, useEffect, useRef} from 'react';

import axios from 'axios';

import './App.css';




function App() {


  const [loaded, setLoaded] = useState(false);
  const [countries, setCountries] = useState();

  const [showOneCountry, setShowOneCountry] = useState(false);
  const [countryData, setCountryData] = useState();

  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    axios.get(`https://restcountries.eu/rest/v2/all`)
    .then(res => {
      setCountries(res.data)
      setLoaded(true)
    })
  }, [])
  
  function Country(props){
    return(
      <div className="country-container" onClick={() => showCountry({name: props.name, img:props.img, population: props.population, region: props.region, capital: props.capital, nativename: props.nativename, subregion: props.subregion, topLevelDomain: props.topLevelDomain, numericCode: props.numericCode, timezone: props.timezone, borders: props.borders, languages: props.languages})}>
        <div className="country-image-container">
          <img src={props.img} className="country-image" alt="flag"/>
        </div>
        <div className="country-info">
          <h3>{props.name}</h3>
          <p>Population : <span className="bold">{props.population}</span></p>
          <p>Region : <span className="bold">{props.region}</span></p>
          <p>Capital : <span className="bold">{props.capital}</span></p>
        </div>
      </div>
    );
  }

  function OneCountry(){

    return(
      <div className="main">
        <div className="inputs">
            <span onClick={() => {setShowOneCountry(false)}} className="back-button" id="hello"><i className="fas fa-arrow-left" style={{marginRight: '5px'}}></i> Back</span>
        </div>
        <div className="country-info-container">


          <div className="country-info-flag">
            <img src={countryData.img} alt="flag"/>
          </div>


        
          <div className="country-details-container">
            <h1 className="country-info-name">{countryData.name}</h1>
            <div className="country-info-details"> 
              
              <div className="country-info-details-left bold-text">
                <p>Native Name: <span>{countryData.nativename}</span></p>
                <p>Population: <span>{countryData.population}</span></p>
                <p>Region: <span>{countryData.region}</span></p>
                <p>Sub Region: <span>{countryData.subregion}</span></p>
                <p>Capital: <span>{countryData.capital}</span></p>
              </div>
              <div className="country-info-details-right bold-text">
                <p>Top Level Domain: <span>{countryData.topLevelDomain}</span></p>
                <p>Numeric Code: <span>{countryData.numericCode}</span></p>
                <p>Time zones: {countryData.timezone.map(time => (
                  <span> {time},</span>
                ))}</p>
                <p>Languages: {countryData.languages.map(language => (
                  <span> {language.name},</span>
                ))}</p>
              </div>
            </div>
            <div className="border-countries">
            <p>Border Countries: {countryData.borders.map(border => (
                  <span>{border}</span>
                ))}</p>
          </div>
          </div>
          

        </div>
      </div>
    );
  }

function Input(){
  return(
    <input type="text" key="searchKey" className="input" placeholder="Search" onKeyDown={(e) => {handleKeyDown(e)}} defaultValue={searchValue} onInput={e => {setSearchValue(e.target.value)}} />
  );
}

  function AllCountries(){

  

    return(
      <div className="main">
        <div className="inputs">
          <input type="text" key="searchKey" className="input" placeholder="Search" onKeyUp={(e) => {handleKeyDown(e)}} defaultValue={searchValue} onInput={e => {setSearchValue(e.target.value)}} /> 
          <div className="dropdown">
            <span className="dropdown-button" id="hello">Filter by Region <i className="fas fa-chevron-down" style={{marginLeft: '5px'}}></i></span>
            <div className="dropdown-content">
              <p onClick={()=>{getRegionCountries('africa')}}>Africa</p>
              <p onClick={()=>{getRegionCountries('america')}}>America</p>
              <p onClick={()=>{getRegionCountries('asia')}}>Asia</p>
              <p onClick={()=>{getRegionCountries('europe')}}>Europe</p>
              <p onClick={()=>{getRegionCountries('oceania')}}>Oceania</p>
            </div>
          </div>
        </div>
        <div className="countries">
          {
          loaded ? 
          countries.map(country => (
            <Country key={country.id} name={country.name} img={country.flag} population={country.population} region={country.region} capital={country.capital} nativename={country.nativeName} subregion={country.subregion} topLevelDomain={country.topLevelDomain} numericCode={country.numericCode} timezone={country.timezones} borders={country.borders} languages={country.languages}/>
            )
          ) : <h3>Loading...</h3>
          }
          
        </div>
      </div>
    );
  }

  const getRegionCountries = (name) =>{
    axios.get(`https://restcountries.eu/rest/v2/region/${name}`)
    .then(res => {
      setCountries(res.data)
    })
  }

  
  const searchCountries = (name) =>{
    axios.get(`https://restcountries.eu/rest/v2/name/${name}`)
    .then(res => {
      setCountries(res.data)
    })
  }

  const getAllCountries = () =>{
    axios.get(`https://restcountries.eu/rest/v2/all`)
    .then(res => {
      setCountries(res.data)
    })
  }


  const handleKeyDown = (event) =>{
    console.log(event.target.value)
      let evt = new KeyboardEvent("keydown", {
        key: "Enter",
        keyCode: 13
      });
      document.dispatchEvent(evt);
      if(searchValue === ''){
        getAllCountries()
      }else{
        searchCountries(searchValue); 
      }
    
  }

  const showCountry = (props) =>{
    setCountryData(props)
    console.log("props: " + props)
    setShowOneCountry(true);
  }

  return (
    <div className="App">
      <div className="navigation">
        <h1 className="title">Where in the world?</h1>
        <div className="dark-mode">
          <i className="fas fa-moon" style={{marginRight: '10px'}}></i> {/* <i className="far fa-moon"></i>*/}
          <h3>Dark Mode</h3>
        </div>
      </div>
      {showOneCountry ? <OneCountry/> : AllCountries()}
    </div>
  );
}

export default App;
