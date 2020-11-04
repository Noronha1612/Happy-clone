import React, { useState, useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Illustration from '../../assets/LandingIllustration.png';
import LogoWeb from '../../assets/LogoWeb.png';
import LogoMobile from '../../assets/LogoMobile.png';

import ILocation from '../../types/location';

import './styles.css';

const Landing: React.FC = () => {
  const [ latitude, setLatitude ] = useState(0);
  const [ longitude, setLongitude ] = useState(0);
  const [ hasLocationAccess, setHasLocationAccess ] = useState(false);
  const [ location, setLocation ] = useState<ILocation>({ results: [{ components: { state: '', city: '' }}]});
  
  const [ logo, setLogo ] = useState(window.innerWidth > 1200 ? LogoWeb : LogoMobile);

  useEffect(() => {
    function checkLogo() {
      if ( window.innerWidth > 1200 ) setLogo(LogoWeb);
      else setLogo(LogoMobile);
    }

    window.addEventListener('resize', checkLogo);
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      setHasLocationAccess(true);
    }, error => {
      setHasLocationAccess(false);
      console.log(error);
    });
  }, []);

  useEffect(() => {
    async function setUserLocation() {
      const response = await axios.get<ILocation>(`https://api.opencagedata.com/geocode/v1/json?key=${process.env.REACT_APP_GEOLOCATION_KEY}&q=${latitude},${longitude}&pretty=1`);
    
      setLocation(response.data);
    }

    if ( hasLocationAccess ) {
      setUserLocation();
    }
  }, [ hasLocationAccess, latitude, longitude ]);

  return (
      <div className="landing-container">
          <div className="wrapper">
            <img src={Illustration} alt="Faça a felicidade" className="background-illustration"/>
            <img src={ logo } alt="Happy" className="main-logo"/>

            <div className="content">
                <h1>Leve felicidade para o mundo</h1>

                <h3>Visite orfanatos e mude o dia de muitas crianças.</h3>
            </div>


            {hasLocationAccess && (<div className="location">
                <strong>{location.results[0].components.city}</strong>
                <span>{location.results[0].components.state}</span>
            </div>)}

            <Link to="/map" className="enter"><FaArrowRight/></Link>
          </div>
      </div>
  );
}

export default Landing;