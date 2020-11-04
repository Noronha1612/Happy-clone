import axios from 'axios';

import { ILocationResponse, ILocation } from '../types/location';

export default async function GetUserLocation(position: Position): Promise<ILocation> {

    if ( localStorage.getItem('location') ) 
        return JSON.parse(localStorage.getItem('location') as string);
    
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const location = await axios.get<ILocationResponse>(`https://api.opencagedata.com/geocode/v1/json?key=${process.env.REACT_APP_GEOLOCATION_KEY}&q=${latitude},${longitude}&pretty=1`);

    const formatedLocation: ILocation = {
        results: location.data.results,
        coords: {
            latitude,
            longitude
        }
    };
    
    localStorage.setItem('location', JSON.stringify(formatedLocation));

    return formatedLocation;
}