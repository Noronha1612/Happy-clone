import React, { useState, useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import Illustration from '../../assets/LandingIllustration.png';
import LogoWeb from '../../assets/LogoWeb.png';
import LogoMobile from '../../assets/LogoMobile.png';

import { ILocation } from '../../types/location';

import GetUserLocation from '../../utils/GetUserLocation';

import './styles.css';

const Landing: React.FC = () => {
  const [ logo, setLogo ] = useState(window.innerWidth > 1200 ? LogoWeb : LogoMobile);
  const [ location, setLocation ] = useState<ILocation>({ 
    coords: {latitude: 0, longitude: 0}, 
    results: [{components: {city: '', state:''}}] 
  });

  useEffect(() => {
    function checkLogo() {
      if ( window.innerWidth > 1200 ) setLogo(LogoWeb);
      else setLogo(LogoMobile);
    }

    window.addEventListener('resize', checkLogo);
  }, []);

  useEffect(() => {
    async function getPosition() {
      window.navigator.geolocation.getCurrentPosition(async position => {
        const locationResponse = await GetUserLocation(position);

        setLocation(locationResponse);
      });
    }

    getPosition();
  }, []);

  return (
      <div className="landing-container">
          <div className="wrapper">
            <img src={Illustration} alt="Faça a felicidade" className="background-illustration"/>
            <img src={ logo } alt="Happy" className="main-logo"/>

            <div className="content">
                <h1>Leve felicidade para o mundo</h1>

                <h3>Visite orfanatos e mude o dia de muitas crianças.</h3>
            </div>


            {location.results[0].components.city && (<div className="location">
                <strong>{location.results[0].components.city}</strong>
                <span>{location.results[0].components.state}</span>
            </div>)}

            <Link to="/map" className="enter"><FaArrowRight/></Link>
          </div>
      </div>
  );
}

export default Landing;