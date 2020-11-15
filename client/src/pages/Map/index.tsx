import React, { useState, useEffect } from 'react';
import { Marker, Popup, useMapEvent } from 'react-leaflet';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { LeafletEvent } from 'leaflet';

import LeafletMap from '../../components/Map';
import MarkerIcon from '../../components/Map/HappyIcon';
import LandingButton from '../../components/LandingButton';

import GetUserLocation from '../../utils/GetUserLocation';
import api from '../../services/api';

import { ILocation } from '../../types/location';
import { IOrphanage, IOrphanageResponse } from '../../types/orphanages';

import './styles.css';
import { Link } from 'react-router-dom';

const MapInteractions: React.FC<{ setZoom: (zoom: number) => void }> = ({ setZoom }) => {
    useMapEvent('zoom', handleZoomChange);

    function handleZoomChange(event: LeafletEvent) {
        setZoom(event.sourceTarget._zoom);
    }

    return null;
}

const Map: React.FC = () => {

    const [ location, setLocation ] = useState<ILocation>({ 
        coords: {latitude: 0, longitude: 0}, 
        results: [{components: {city: '', state:''}}] 
    });

    const [ orphanages, setOrphanages ] = useState<IOrphanage[]>([]);
    const [ zoom, setZoom ] = useState(15);

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

    return (
        <div className="map-container">
            <aside>
            
                <LandingButton className="happy-point" />

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
                    { zoom > 12 && orphanages.map( orph => (
                        <Marker key={orph.id} icon={MarkerIcon} position={[orph.location.latitude, orph.location.longitude]}>
                            <Popup 
                                closeButton={false}
                                maxWidth={240}
                                className="popup"
                            >
                                <span>{ orph.name }</span>
                                <Link to={`/orphanage/${orph.id}`} className="orphanage-btn">
                                    <FiArrowRight size={14} className="arrowR-icon" />
                                </Link>
                            </Popup>
                        </Marker>
                    ))}
                    <MapInteractions setZoom={ setZoom } />
                </LeafletMap>
            </section>

            <Link to="/orphanages/create" className="create-btn">
                <FiPlus size={32} className="plus-icon" />  
            </Link>
        </div>
    );
}

export default Map;