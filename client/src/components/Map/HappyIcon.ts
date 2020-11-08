import L from 'leaflet';
import HappyIcon from '../../assets/HappyPoint.png';

export default L.icon({
    iconUrl: HappyIcon,
    iconSize: [55, 65],
    iconAnchor: [29, 68],
    popupAnchor: [0, -60]
})