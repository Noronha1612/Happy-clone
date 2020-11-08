import React, { useState, useEffect } from 'react';
import { MapContainer, MapContainerProps, TileLayer } from 'react-leaflet';

import GetUserLocation from '../../utils/GetUserLocation';

import { ILocation } from '../../types/location';

interface MapProps extends MapContainerProps {
    interactive?: boolean;
    children: React.ReactNode;
}

const Map: React.FC<MapProps> = ({ children, interactive = true, ...props }) => {
    const [ location, setLocation ] = useState<ILocation>({
        coords: {
            latitude: 0,
            longitude: 0
        },
        results: [{
            components: {
                city: '',
                state: ''
            }
        }]
    });

    useEffect(() => {
        window.navigator.geolocation.getCurrentPosition(async position => {
            const response = await GetUserLocation(position);

            setLocation(response);
        });
    }, []);

    if( location.results[0].components.city ) return (
        <MapContainer
            center={[location.coords.latitude, location.coords.longitude]}
            zoom={15}
            style={{ height: '100%', width: '100%'}}
            dragging={interactive}
            touchZoom={interactive}
            zoomControl={interactive}
            scrollWheelZoom={interactive}
            doubleClickZoom={interactive}
        >

            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {children}

        </MapContainer>
    );
    else return <div>Carregando... <br/><i>Se demorar muito, verifique se está habilitada a localização</i></div>
}

export default Map;