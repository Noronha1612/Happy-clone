import React, { useEffect, useState } from 'react';
import { Marker } from 'react-leaflet';
import { RouteComponentProps } from 'react-router';
import { FiClock, FiInfo } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

import AsideBar from '../../components/AsideBar';
import Map from '../../components/Map';
import HappyIcon from '../../components/Map/HappyIcon';

import api from '../../services/api';

import { IOrphanage, IOrphanageResponse } from '../../types/orphanages';

import './styles.css';

interface MatchParams {
    id: string;
}

const Orphanage: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {
    const [ orphanage, setOrphanage ] = useState<IOrphanage | null>(null);

    useEffect(() => {
        async function getOrphanageData() {
            const response = await api.get<IOrphanageResponse>(`/orphanages?orphanageId=${match.params.id}`);

            if(response.data.data) setOrphanage(response.data.data[0]);
        }

        getOrphanageData();
    }, [match.params.id])

    if (!orphanage) return (
        <h1
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
                fontFamily: 'sans-serif'
            }}
        >Loading...</h1>
    );

    return (
        <div className="orphanage-container">
            <AsideBar />
            <main>
                <h4>Orfanato</h4>
                <fieldset>
                    <h1>{orphanage.name}</h1>
                    <p>{orphanage.about}</p>
                    <section>
                        <Map>
                            <Marker 
                                position={ [orphanage.location.latitude, orphanage.location.longitude] } 
                                icon={HappyIcon}
                            />
                            <span>Ver rotas no Google Mapos</span>
                        </Map>
                    </section>
                    
                    <h2>Instruções para visita</h2>
                    <p>{orphanage.instructions}</p>
                    
                    <div>
                        <section>
                            <FiClock />
                            <p>
                                {orphanage.open_hours}
                            </p>
                        </section>
                        <section>
                            <FiInfo />
                            <p>
                                {orphanage.open_hours}
                            </p>
                        </section>
                    </div>

                    <button>
                        <FaWhatsapp />
                        <span>Entrar em contato</span>
                    </button>
                </fieldset>
            </main>
        </div>
    );
}

export default Orphanage;