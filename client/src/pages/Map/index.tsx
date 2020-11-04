import React from 'react';

import HappyPoint from '../../assets/HappyPoint.png';

import './styles.css';

const Map: React.FC = () => {
  return (
      <div className="map-container">
          <aside>
              <img src={ HappyPoint } alt="Happy" className="happy-point"/>

              <main>
                  <h1>Escolha um orfanato no mapa</h1>
                  <h4>Muitas crianças estão <br/> esperando a sua visita :)</h4>
              </main>

              {/* Localização */}
          </aside>
      </div>
  );
}

export default Map;