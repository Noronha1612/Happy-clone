import React, { useState, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { FiPlus, FiArrowRight } from 'react-icons/fi';

import LeafletMap from '../../components/Map';
import MarkerIcon from '../../components/Map/HappyIcon';

import GetUserLocation from '../../utils/GetUserLocation';
import api from '../../services/api';

import HappyPoint from '../../assets/HappyPoint.png';

import { ILocation } from '../../types/location';
import { IOrphanage, IOrphanageResponse } from '../../types/orphanages';

import './styles.css';
import { Link } from 'react-router-dom';

const Map: React.FC = () => {

    const [ location, setLocation ] = useState<ILocation>({ 
        coords: {latitude: 0, longitude: 0}, 
        results: [{components: {city: '', state:''}}] 
    });

    const [ orphanages, setOrphanages ] = useState<IOrphanage[]>([]);

    useEffect(() => {
        async function getPosition() {
            window.navigator.geolocation.getCurrentPosition(async position => {
                const locationResponse = await GetUserLocation(position);

                setLocation(locationResponse);
            });
        }

        getPosition();
    }, []);

    useEffect(() => {
        async function getOrphanages() {
            const response = await api.get<IOrphanageResponse>('/orphanages');

            if (response.data.data) setOrphanages(response.data.data);
        }

        getOrphanages();
    }, []);

    console.log(orphanages);

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
                <LeafletMap>
                    { orphanages.map( orph => (
                        <Marker key={orph.id} icon={MarkerIcon} position={[orph.location.latitude, orph.location.longitude]}>
                            <Popup 
                                closeButton={false}
                                maxWidth={240}
                                className="popup"
                            >
                                <span>{ orph.name }</span>
                                <button className="orphanage-btn">
                                    <FiArrowRight size={14} className="arrowR-icon" />
                                </button>
                            </Popup>
                        </Marker>
                    ))}
                </LeafletMap>
            </section>

            <Link to="/orphanages/create" className="create-btn">
                <FiPlus size={32} className="plus-icon" />  
            </Link>
        </div>
    );
}

export default Map;