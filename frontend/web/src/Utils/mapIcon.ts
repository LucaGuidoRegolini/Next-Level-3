import Leaflet from 'leaflet'

import mapMarkerImg from '../images/Local.svg';

const MapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,
  
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    //popupAnchor: [0, -60]
    popupAnchor: [178, 2]
})

export default MapIcon

