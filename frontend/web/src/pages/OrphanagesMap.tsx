import React, { useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'
import {FiPlus, FiArrowRight} from 'react-icons/fi'


import MapIcon from '../Utils/mapIcon';
import api from '../Services/api';

import '../styles/pages/OrphanagesMap.css'
import 'leaflet/dist/leaflet.css'

import mapMarkerimg from '../images/Local.svg'

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([])

  useEffect(() => {
    api.get('orphanages').then(response =>{
      setOrphanages(response.data);
    })
  }, [])

  return(
    <div id="page-map">
      <aside>
        <header>
        <img src={mapMarkerimg} alt="Happy"/>
        <h2>Escolha um orfanato no mapa</h2>
        <p>Muitas crianças estão
           esperando a sua visita :)</p>
        </header>
        <footer>
          <strong>São Paulo</strong>
          <span>São Paulo</span>
        </footer>
      </aside>
      
      <Map 
        center={[-23.560673,-46.6003574]}
        zoom={15}
        style={{width: "100%", height: "100%"}}
      >
        {/*<TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>*/}
        <TileLayer 
        url={
          `https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} 
        />

        {orphanages.map(orphanage => {
          return (
            <Marker key={orphanage.id}
            icon={MapIcon}
            position={[orphanage.latitude,orphanage.longitude]}
            >
              <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                {orphanage.name}
                <Link to={`/orphaneges/${orphanage.id}`}>
                  <FiArrowRight size="20" color="FFF"/>
                </Link>
              </Popup>
            </Marker>
          )
        })}

      </Map>

      <Link to="/orphaneges/create" className="create-orphanage">
        <FiPlus size={32} color="FFF"/>
      </Link>
    </div>
  )
};

export default OrphanagesMap
