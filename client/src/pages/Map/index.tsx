import React, { useState, useEffect } from 'react';

import GetUserLocation from '../../utils/GetUserLocation';

import HappyPoint from '../../assets/HappyPoint.png';

import { ILocation } from '../../types/location';

import './styles.css';

const Map: React.FC = () => {

    const [ location, setLocation ] = useState<ILocation>({ 
        coords: {latitude: 0, longitude: 0}, 
        results: [{components: {city: '', state:''}}] 
    });

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
        <div className="map-container">
            <aside>
                <img src={ HappyPoint } alt="Happy" className="happy-point"/>

                <main>
                    <h1>Escolha um orfanato no mapa</h1>
                    <h4>Muitas crianças estão <br/> esperando a sua visita :)</h4>
                </main>

                {location.results[0].components.city && (
                    <div className="location">
                        <strong>{location.results[0].components.city}</strong>
                        <span>{location.results[0].components.state}</span>
                    </div>
                )}
            </aside>

            <section>
                <span>MAPA</span>
            </section>
        </div>
    );
}

export default Map;