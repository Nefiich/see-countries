
import React, {useState, useEffect} from 'react';

import axios from 'axios';

import './App.css';




function App() {


  const [loaded, setLoaded] = useState(false);
  const [countries, setCountries] = useState([{name: 'Bosnia', img: null, region: 'Europe', capital: 'Sarajevo', nativename: 'Bosnia', subregion:'Balkans', numericCode: '387', borders: 'CRO', languages: 'Bosanski'}]);

  const [showOneCountry, setShowOneCountry] = useState(false);
  const [countryData, setCountryData] = useState();

  const [searchValue, setSearchValue] = useState('');

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    axios.get(`https://restcountries.com/v3/all`)
    .then(res => {
      setCountries(res.data)
      setLoaded(true)
    })
  }, [])
  
  function Country(props){
    return(
      <div className="country-container" onClick={() => showCountry({name: props.name, img:props.img, region: props.region, capital: props.capital, nativename: props.nativename, subregion: props.subregion, numericCode: props.numericCode, borders: props.borders, languages: props.languages})}>
        <div className="country-image-container">
          <img src={props.img} className="country-image" alt="flag"/>
        </div>
        <div className="country-info">
          <h3>{props.name}</h3>
          <p>Region : <span className="bold">{props.region}</span></p>
          <p>Capital : <span className="bold">{props.capital}</span></p>
        </div>
      </div>
    );
  }

  function OneCountry(){
    console.log(countryData.borders);

    if(countryData.borders === undefined){
      countryData.borders = false;
    }

    console.log("after" + countryData.borders);

    return(
      <div className="main-one">
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
                <p>Region: <span>{countryData.region}</span></p>
                <p>Sub Region: <span>{countryData.subregion}</span></p>
                <p>Capital: <span>{countryData.capital}</span></p>
              </div>
              <div className="country-info-details-right bold-text">
                <p>Numeric Code: <span>{countryData.numericCode}</span></p>
                <p>Languages : {() => {for(var key in countryData.languages){
                  <span>{countryData.languages[key]}, </span>
                }}}</p>
              </div>
            </div>
            <div className={darkMode ? 'border-countries-dark' : 'border-countries'}>
            <p>Border Countries: {countryData.borders ? countryData.borders.map(border => (
                  <span>{border}</span>
                )) : <span>None</span>}</p>
          </div>
          </div>
          

        </div>
      </div>
    );
  }

  function AllCountries(){

  

    return(
      <div className="main">
        <div className="inputs">
          <input type="text" className={darkMode ? 'input-dark' : 'input'} placeholder="Search" onKeyUp={(e) => {handleKeyDown(e)}} defaultValue={searchValue} onInput={e => {setSearchValue(e.target.value)}} /> 
          <div className="dropdown">
            <span className="dropdown-button" id="hello">Filter by Region <i className="fas fa-chevron-down" style={{marginLeft: '5px'}}></i></span>
            <div className={darkMode ? 'dropdown-content-dark' : 'dropdown-content'}>
              <p onClick={()=>{getRegionCountries('africa')}}>Africa</p>
              <p onClick={()=>{getRegionCountries('americas')}}>America</p>
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
            <Country key={country.cca3} name={country.name.official} img={country.flags[0]} region={country.region} capital={country.capital} nativename={country.name.common} subregion={country.subregion} numericCode={country.ccn3} borders={country.borders} languages={country.languages}/>
            )
          ) : <h3>Loading...</h3>
          }
          
        </div>
      </div>
    );
  }

  const getRegionCountries = (name) =>{
    axios.get(`https://restcountries.com/v3/region/${name}`)
    .then(res => {
      setCountries(res.data)
    })
  }

  
  const searchCountries = (name) =>{
    axios.get(`https://restcountries.com/v3/name/${name}`)
    .then(res => {
      setCountries(res.data)
    })
  }

  const getAllCountries = () =>{
    axios.get(`https://restcountries.com/v3/all`)
    .then(res => {
      setCountries(res.data)
    })
  }


  const handleKeyDown = (event) =>{
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
    setShowOneCountry(true);
  }

  const darkModeActive = () => {
    setDarkMode(!darkMode);
    if(darkMode === true){
      document.body.classList.remove('bg-black');
    }else{
      document.body.classList.add('bg-black');
    }
  }

  console.log(countries)

  return (
    <div className={darkMode ? 'App-dark' : 'App'}>
      <div className={darkMode ? 'navigation-dark' : 'navigation'}>
        <h1 className="title">Where in the world?</h1>
        <div className="dark-mode" onClick={() => {darkModeActive()}}>
          <i className="fas fa-moon" style={darkMode ? {color: 'white', marginRight: '10px'} : {marginRight: '10px'}}></i> {/* <i className="far fa-moon"></i>*/}
          <h3> Dark Mode</h3>
        </div>
      </div>
      {showOneCountry ? <OneCountry/> : AllCountries()}
    </div>
  );
}

export default App;
