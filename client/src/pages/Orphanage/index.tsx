import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import AsideBar from '../../components/AsideBar';

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
                    
                </fieldset>
            </main>
        </div>
    );
}

export default Orphanage;