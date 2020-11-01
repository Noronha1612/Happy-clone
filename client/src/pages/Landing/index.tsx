import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

import Illustration from '../../assets/LandingIllustration.png';
import Logo from '../../assets/Logo.png';

import './styles.css';

const Landing: React.FC = () => {
  return (
      <div className="landing-container">
          <div className="wrapper">
            <img src={Logo} alt="Happy"/>

            <div className="content">
                <h1>Leve felicidade para o mundo</h1>

                <h3>Visite orfanatos e mude o dia de muitas crianças.</h3>
            </div>

            <img src={Illustration} alt="Faça a felicidade" className="background-illustration"/>

            <div className="location">
                <strong>Recife</strong>
                <span>Pernambuco</span>
            </div>

            <button className="enter"><FaArrowRight/></button>
          </div>
      </div>
  );
}

export default Landing;